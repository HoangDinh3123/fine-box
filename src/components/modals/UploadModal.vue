<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="$emit('close')">
    <div class="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-800">Upload Files</h2>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600">
          <i class="fas fa-times text-2xl"></i>
        </button>
      </div>

      <div
        @dragover.prevent="dragOver = true"
        @dragleave="dragOver = false"
        @drop.prevent="handleDrop"
        :class="[
          'border-3 border-dashed rounded-xl p-12 text-center transition-all',
          dragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-gray-50'
        ]"
      >
        <i class="fas fa-cloud-upload-alt text-6xl text-gray-400 mb-4"></i>
        <h3 class="text-lg font-semibold text-gray-700 mb-2">Drag & Drop files here</h3>
        <p class="text-gray-500 mb-4">or</p>
        <label class="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold cursor-pointer hover:bg-purple-700 transition-colors">
          Browse Files
          <input type="file" multiple @change="handleFileSelect" class="hidden">
        </label>
      </div>

      <div v-if="files.length > 0" class="mt-6">
        <h4 class="font-semibold mb-3">Selected Files ({{ files.length }})</h4>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div v-for="(file, index) in files" :key="index" class="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
            <span class="truncate">{{ file.name }}</span>
            <span class="text-sm text-gray-500">{{ (file.size / 1024).toFixed(1) }} KB</span>
          </div>
        </div>
        <button @click="uploadFiles" class="w-full mt-4 px-6 py-3 bg-linear-to-r from-purple-600 to-purple-800 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
          Upload {{ files.length }} File{{ files.length > 1 ? 's' : '' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue'
    const emit = defineEmits(['close', 'upload'])

    const dragOver = ref(false)
    const files = ref([])

    function handleDrop(e) {
      dragOver.value = false
      const droppedFiles = Array.from(e.dataTransfer.files)
      files.value = droppedFiles
    }

    function handleFileSelect(e) {
    files.value = Array.from(e.target.files)
    }

    function uploadFiles() {
      emit('upload', files.value)
      emit('close')
    }
</script>