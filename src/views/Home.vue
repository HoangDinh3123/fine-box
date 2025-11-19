<template>
  <div class="min-h-screen bg-gray-50">
    <Header />
    
    <div class="flex">
      <Sidebar @upload="showUploadModal = true" />
      
      <main class="flex-1 p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Header -->
          <div class="flex items-center justify-between mb-6">
            <h1 class="text-3xl font-bold text-gray-800">
              {{ fileStore.activeMenu.charAt(0).toUpperCase() + fileStore.activeMenu.slice(1) }}
            </h1>
            <div class="flex gap-2">
              <button 
                @click="fileStore.setViewMode('grid')"
                :class="[
                  'px-4 py-2 rounded-lg border-2 transition-colors flex items-center gap-2',
                  fileStore.viewMode === 'grid' 
                    ? 'border-purple-500 bg-purple-50 text-purple-600' 
                    : 'border-gray-200 hover:border-purple-300'
                ]">
                <i class="fas fa-th"></i>
                Grid
              </button>
              <button 
                @click="fileStore.setViewMode('list')"
                :class="[
                  'px-4 py-2 rounded-lg border-2 transition-colors flex items-center gap-2',
                  fileStore.viewMode === 'list' 
                    ? 'border-purple-500 bg-purple-50 text-purple-600' 
                    : 'border-gray-200 hover:border-purple-300'
                ]">
                <i class="fas fa-list"></i>
                List
              </button>
            </div>
          </div>

          <!-- Toolbar -->
          <FileToolbar />

          <!-- Loading State -->
          <div v-if="fileStore.loading" class="flex items-center justify-center py-20">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>

          <!-- Files Grid -->
          <FileGrid
            v-else-if="fileStore.filteredFiles.length > 0"
            :files="fileStore.filteredFiles"
            @file-click="handleFileClick"
            @file-action="handleFileAction"
            @file-contextmenu="handleFileContextMenu"
          />

          <!-- Empty State -->
          <div v-else class="text-center py-20">
            <i class="fas fa-folder-open text-6xl mb-4 opacity-50 text-gray-400"></i>
            <h3 class="text-xl font-semibold text-gray-700 mb-2">No files yet</h3>
            <p class="text-gray-500">Upload your first file to get started</p>
          </div>
        </div>
      </main>
    </div>

    <!-- Upload Modal -->
    <UploadModal 
      v-if="showUploadModal"
      @close="showUploadModal = false"
      @upload="handleUpload"
    />

    <!-- Context Menu -->
    <ContextMenu
      v-if="contextMenu.show"
      :x="contextMenu.x"
      :y="contextMenu.y"
      :file="contextMenu.file"
      @close="closeContextMenu"
      @action="handleContextAction"
    />
  </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue'
    import { useRoute } from 'vue-router'
    import Header from '@/components/common/Header.vue'
    import Sidebar from '@/components/common/Sidebar.vue'
    import FileGrid from '@/components/file/FileGrid.vue'
    import FileToolbar from '@/components/file/FileToolbar.vue'
    import UploadModal from '@/components/modals/UploadModal.vue'
    import ContextMenu from '@/components/modals/ContextMenu.vue'
    import { useFileStore } from '@/stores/fileStore'
    import { useUserStore } from '@/stores/userStore'

    const route = useRoute()
    const fileStore = useFileStore()
    const userStore = useUserStore()

    const showUploadModal = ref(false)
    const contextMenu = ref({
        show: false,
        x: 0,
        y: 0,
        file: null
    })

    onMounted(() => {
        userStore.checkAuth()
        
        if (route.name) {
            fileStore.setActiveMenu(route.name)
        }
        
        fileStore.fetchFiles()
    })

    function handleFileClick(file) {
        console.log('File clicked:', file)
    }

    function handleFileAction(file) {
        console.log('File action:', file)
    }

    function handleFileContextMenu(event, file) {
        contextMenu.value = {
            show: true,
            x: event.clientX,
            y: event.clientY,
            file: file
        }
    }

    function handleContextAction(action) {
        const file = contextMenu.value.file
        contextMenu.value.show = false
        
        switch(action) {
            case 'download':
            console.log('Download:', file)
            break
            case 'share':
            console.log('Share:', file)
            break
            case 'rename':
            console.log('Rename:', file)
            break
            case 'star':
            fileStore.toggleStar(file.id)
            break
            case 'delete':
            if (confirm(`Delete ${file.name}?`)) {
                fileStore.deleteFile(file.id)
            }
            break
        }
    }

    function handleUpload(files) {
        fileStore.uploadFiles(files)
    }

    function closeContextMenu() {
        contextMenu.value.show = false
    }

    onMounted(() => {
        document.addEventListener('click', closeContextMenu)
    })
</script>