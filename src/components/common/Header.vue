<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
    <div class="flex items-center justify-between max-w-full">
      <div class="text-2xl font-bold bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
        FineBox
      </div>

      <div class="flex items-center gap-6">
        <div class="relative">
          <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Search files..."
            @input="handleSearch"
            class="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg w-80 focus:border-purple-500 focus:outline-none transition-colors"
          />
        </div>

        <div class="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-3 py-2 transition-colors">
          <div class="w-10 h-10 rounded-full bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center text-white font-semibold">
            {{ userStore.userInitials }}
          </div>
          <span class="font-medium">{{ userStore.userName }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
    import { useUserStore } from '@/stores/userStore'
    import { useFileStore } from '@/stores/fileStore'

    const userStore = useUserStore()
    const fileStore = useFileStore()

    function handleSearch(event) {
        fileStore.setSearchQuery(event.target.value)
    }
</script>