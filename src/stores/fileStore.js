import { defineStore } from 'pinia'
import { fileService } from '@/services/fileService'

export const useFileStore = defineStore('file', {
    state: () => ({
        files: [],
        loading: false,
        error: null,
        searchQuery: '',
        activeMenu: 'all',
        viewMode: 'grid',
        sortBy: 'name',
        filterType: 'all'
    }),

    getters: {
        filteredFiles: (state) => {
            let filtered = [...state.files]

            // Filter by menu
            if (state.activeMenu === 'favorites') {
                filtered = filtered.filter(f => f.starred)
            } 
            else if (state.activeMenu === 'shared') {
                filtered = filtered.filter(f => f.shared)
            } 
            else if (state.activeMenu === 'recent') {
                // sort by newest first
                filtered = filtered.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate))
            } 
            else if (['documents', 'images', 'audio', 'videos'].includes(state.activeMenu)) {
                const typeMap = {
                    documents: ['document', 'pdf'],
                    images: ['image'],
                    audio: ['audio'],
                    videos: ['video']
                }
                // Filter files by type according to the selected category
                filtered = filtered.filter(f => typeMap[state.activeMenu].includes(f.type))
            }

            // Filter by type
            if (state.filterType !== 'all') {
                filtered = filtered.filter(f => f.type === state.filterType)
            }

            // Filter by search
            if (state.searchQuery) {
                filtered = filtered.filter(f =>
                f.name.toLowerCase().includes(state.searchQuery.toLowerCase())
                )
            }

            // Sort
            if (state.sortBy === 'name') {
                filtered.sort((a, b) => a.name.localeCompare(b.name))
            } else if (state.sortBy === 'modified') {
                filtered.sort((a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate))
            } else if (state.sortBy === 'size') {
                filtered.sort((a, b) => (b.sizeBytes || 0) - (a.sizeBytes || 0))
            }

            return filtered
        },

        fileCount: (state) => state.files.length,
        
        favoriteCount: (state) => state.files.filter(f => f.starred).length,
        
        sharedCount: (state) => state.files.filter(f => f.shared).length
    },

    actions: {
        //Fetch files from the API and update loading/error states
        async fetchFiles() {
            this.loading = true
            this.error = null
            try {
                this.files = await fileService.fetchFiles()
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },

        //Upload files and add to list
        async uploadFiles(fileList) {
            this.loading = true
            try {
                const newFiles = await fileService.uploadFiles(fileList)
                this.files.unshift(...newFiles)
            } catch (e) {
                this.error = e.message
            } finally {
                this.loading = false
            }
        },

        //Delete a file
        async deleteFile(fileId) {
            try {
                await fileService.deleteFile(fileId)
                this.files = this.files.filter(f => f.id !== fileId)
            } catch (e) {
                this.error = e.message
            }
        },

        //Toggle the 'starred' status of a file and update it on the server
        async toggleStar(fileId) {
            const file = this.files.find(f => f.id === fileId)
            if (file) {
                file.starred = !file.starred
                await fileService.updateFile(fileId, { starred: file.starred })
            }
        },

        //Share a file with given permissions, update its shared status, and return share info
        async shareFile(fileId, permissions) {
            try {
                const shareData = await fileService.shareFile(fileId, permissions)
                const file = this.files.find(f => f.id === fileId)

                if (file) {
                    file.shared = true
                    file.shareUrl = shareData.shareUrl
                }

                return shareData
            } catch (e) {
                this.error = e.message
                throw e
            }
        },

        //Set the currently active menu
        setActiveMenu(menu) {
            this.activeMenu = menu
        },

        //Update the current search query
        setSearchQuery(query) {
            this.searchQuery = query
        },

        //Change the UI view mode ( grid or list)
        setViewMode(mode) {
            this.viewMode = mode
        },

        //Set the current sorting option (name, date)
        setSortBy(sort) {
            this.sortBy = sort
        },

        //Apply a file type filter
        setFilterType(filter) {
            this.filterType = filter
        }
    }
})