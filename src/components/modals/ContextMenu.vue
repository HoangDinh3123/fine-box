<template>
  <div 
    class="fixed bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 min-w-[200px]"
    :style="{ top: y + 'px', left: x + 'px' }"
    @click.stop>

    <button 
      @click="handleAction('download')" 
      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
      <i class="fas fa-download w-4"></i>
      Download
    </button>

    <button 
      @click="handleAction('share')" 
      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
      <i class="fas fa-share-nodes w-4"></i>
      Share
    </button>

    <button 
      @click="handleAction('rename')" 
      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
      <i class="fas fa-edit w-4"></i>
      Rename
    </button>

    <button 
      @click="handleAction('star')" 
      class="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
      <i :class="['w-4', file.starred ? 'fas fa-star text-yellow-500' : 'far fa-star text-yellow-500']"></i>
      {{ file.starred ? 'Unstar' : 'Star' }}
    </button>

    <hr class="my-2">
    
    <button 
      @click="handleAction('delete')" 
      class="w-full px-4 py-2 text-left hover:bg-red-50 text-red-600 flex items-center gap-3">
      <i class="fas fa-trash w-4"></i>
      Delete
    </button>
  </div>
</template>

<script setup>
    const props = defineProps({
      x: {
          type: Number,
          required: true
      },
      y: {
          type: Number,
          required: true
      },
      file: {
          type: Object,
          required: true
      }
    })

    const emit = defineEmits(['close', 'action'])

    function handleAction(action) {
      emit('action', action)
    }
</script>