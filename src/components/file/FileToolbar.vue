<template>
  <div class="bg-white rounded-xl p-4 mb-6 flex items-center justify-between shadow-sm">
    <div class="flex gap-3">
      <select
        v-model="fileStore.filterType"
        class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
      >
        <option value="all">🏷️ All Types</option>
        <option value="folder">📁 Folders</option>
        <option value="document">📄 Documents</option>
        <option value="image">🖼️ Images</option>
      </select>
    </div>
    <select
      v-model="fileStore.sortBy"
      class="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none"
    >
      <option value="name">Sort by: Name</option>
      <option value="modified">Sort by: Date Modified</option>
      <option value="size">Sort by: Size</option>
      <option value="type">Sort by: Type</option>
    </select>
  </div>
</template>

<script setup>
    import { useFileStore } from '@/stores/fileStore'

    const fileStore = useFileStore()
</script>