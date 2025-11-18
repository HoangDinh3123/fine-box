<template>
    <aside class="w-64 bg-white border-r border-gray-200 p-6">
        <button
        @click="$emit('upload')"
        class="w-full bg-linear-to-r from-purple-600 to-purple-800 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all mb-6"
        >
        Upload Files
        </button>

        <nav class="space-y-6">
        <div>
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4">Main</h3>
            <MenuItem
            v-for="item in mainMenu"
            :key="item.id"
            :item="item"
            :active="fileStore.activeMenu === item.id"
            @click="handleMenuClick(item)"
            />
        </div>

        <div>
            <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-4">Categories</h3>
            <MenuItem
            v-for="item in categoryMenu"
            :key="item.id"
            :item="item"
            :active="fileStore.activeMenu === item.id"
            @click="handleMenuClick(item)"
            />
        </div>
        </nav>

        <div class="mt-6 bg-linear-to-br from-purple-600 to-purple-800 rounded-xl p-4 text-white">
        <div class="text-sm opacity-90 mb-2">Storage Used</div>
        <div class="text-2xl font-bold mb-1">{{ userStore.storageUsedText }}</div>
        <div class="bg-white/30 rounded-full h-2 mb-2 overflow-hidden">
            <div
            class="bg-white h-full rounded-full transition-all"
            :style="{ width: userStore.storagePercentage + '%' }"
            ></div>
        </div>
        <div class="text-sm opacity-90">
            {{ userStore.storagePercentage }}% of {{ userStore.storageTotalText }} used
        </div>
        </div>
    </aside>
</template>

<script setup>
    import MenuItem from './MenuItem.vue'
    import { useUserStore } from '@/stores/userStore'
    import { useFileStore } from '@/stores/fileStore'
    import { useRouter } from 'vue-router'

    const userStore = useUserStore()
    const fileStore = useFileStore()
    const router = useRouter()

    defineEmits(['upload'])

    const mainMenu = [
        { id: 'all', icon: '📁', label: 'All Files', route: '/' },
        { id: 'favorites', icon: '⭐', label: 'Favorites', route: '/favorites' },
        { id: 'shared', icon: '🔗', label: 'Shared', route: '/shared' },
        { id: 'recent', icon: '🕒', label: 'Recent', route: '/recent' },
        { id: 'trash', icon: '🗑️', label: 'Trash', route: '/trash' }
    ]

    const categoryMenu = [
        { id: 'documents', icon: '📄', label: 'Documents' },
        { id: 'images', icon: '🖼️', label: 'Images' },
        { id: 'audio', icon: '🎵', label: 'Audio' },
        { id: 'videos', icon: '🎬', label: 'Videos' }
    ]

    function handleMenuClick(item) {
        if (item.route) {
            router.push(item.route)
        }
        fileStore.setActiveMenu(item.id)
    }
</script>