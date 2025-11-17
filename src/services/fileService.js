// Mock data
const mockFiles = [
    {
        id: '1',
        name: 'Work Projects',
        type: 'folder',
        size: null,
        sizeBytes: null,
        items: 24,
        modified: '2 days ago',
        modifiedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        shared: false,
        starred: false
    },
    {
        id: '2',
        name: 'Presentation.pdf',
        type: 'pdf',
        size: '2.4 MB',
        sizeBytes: 2400000,
        modified: '1 week ago',
        modifiedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        shared: true,
        starred: true
    },
    {
        id: '3',
        name: 'Summer_Vacation.jpg',
        type: 'image',
        size: '5.8 MB',
        sizeBytes: 5800000,
        modified: '3 days ago',
        modifiedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        shared: false,
        starred: false
    },
    {
        id: '4',
        name: 'Report_Q4.docx',
        type: 'document',
        size: '1.2 MB',
        sizeBytes: 1200000,
        modified: '5 days ago',
        modifiedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        shared: false,
        starred: true
    },
    {
        id: '5',
        name: 'Project_Files.zip',
        type: 'archive',
        size: '45.3 MB',
        sizeBytes: 45300000,
        modified: '1 week ago',
        modifiedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        shared: false,
        starred: false
    },
    {
        id: '6',
        name: 'Personal Documents',
        type: 'folder',
        size: null,
        sizeBytes: null,
        items: 12,
        modified: '3 weeks ago',
        modifiedDate: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
        shared: false,
        starred: false
    }
]

// Service for API calls
export const fileService = {
    //Fetch files from server
    async fetchFiles(filters = {}) {
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/files`, {
        //   headers: {
        //     'Authorization': `Bearer ${getToken()}`
        //   }
        // })
        // return await response.json()

        // Mock implementation
        return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockFiles)
        }, 500)
        })
    },

    //upload a file to server
    async uploadFiles(fileList) {
        // 1. Get presigned URLs from API Gateway
        // 2. Upload files to S3 using presigned URLs
        // 3. Return metadata

        // Mock implementation
        return new Promise((resolve) => {
        setTimeout(() => {
            const newFiles = Array.from(fileList).map(file => ({
                id: Date.now() + Math.random().toString(),
                name: file.name,
                type: getFileType(file.name),
                size: formatFileSize(file.size),
                sizeBytes: file.size,
                modified: 'Just now',
                modifiedDate: new Date(),
                shared: false,
                starred: false
            }))
            resolve(newFiles)
        }, 1000)
        })
    },

    //delete file
    async deleteFile(fileId) {
        // await fetch(`${import.meta.env.VITE_API_URL}/files/${fileId}`, {
        //   method: 'DELETE'
        // })

        return new Promise((resolve) => {
            setTimeout(() => resolve({ success: true }), 300)
        })
    },

    //update a file
    async updateFile(fileId, data) {
        // await fetch(`${import.meta.env.VITE_API_URL}/files/${fileId}`, {
        //   method: 'PATCH',
        //   body: JSON.stringify(data)
        // })

        return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 300)
        })
    },

    //share file
    async shareFile(fileId, permissions) {
        // Generate share link via CloudFront + API Gateway
        return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
            shareUrl: `https://finebox.com/share/${fileId}`,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            })
        }, 500)
        })
    }
}

// Helper functions
function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase()
    const typeMap = {
        pdf: 'pdf',
        doc: 'document',
        docx: 'document',
        txt: 'document',
        jpg: 'image',
        jpeg: 'image',
        png: 'image',
        gif: 'image',
        mp3: 'audio',
        wav: 'audio',
        mp4: 'video',
        avi: 'video',
        zip: 'archive',
        rar: 'archive'
    }
    return typeMap[ext] || 'document'
}

//format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'

    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}