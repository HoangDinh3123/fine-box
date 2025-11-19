<template>
  <div
    @click="emit('click', file)"
    @contextmenu.prevent="emit('contextmenu', $event, file)"
    class="bg-white rounded-xl p-5 cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 relative group"
  >
    <div v-if="file.shared" class="absolute top-3 left-3 bg-emerald-50 text-emerald-700 text-xs font-semibold px-2 py-1 rounded-md flex items-center gap-1">
      <i class="fas fa-share-nodes text-xs"></i>
      Shared
    </div>

    <div v-if="file.starred" class="absolute top-3 right-12">
      <i class="fas fa-star text-yellow-500"></i>
    </div>

    <button
      @click.stop="emit('action', file)"
      class="absolute top-3 right-3 w-8 h-8 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
    >
      <i class="fas fa-ellipsis-vertical text-gray-600"></i>
    </button>

    <div :class="['w-16 h-16 rounded-xl bg-linear-to-br flex items-center justify-center text-2xl mb-4', iconColor]">
      <i :class="['fas', 'fa-' + fileIcon, 'text-white']"></i>
    </div>

    <div class="font-semibold text-gray-800 mb-1 truncate">{{ file.name }}</div>
    <div class="text-sm text-gray-500 flex items-center justify-between">
      <span>{{ file.size || file.items + ' items' }}</span>
      <span>{{ file.modified }}</span>
    </div>
  </div>
</template>

<script setup>
    import { computed } from 'vue'
    import { getFileIcon, getFileColor } from '@/utils/fileHelpers'

    const props = defineProps({
        file: {
            type: Object,
            required: true
        }
    })

    const emit = defineEmits(['click', 'action', 'contextmenu'])

    const fileIcon = computed(() => getFileIcon(props.file.type))
    const iconColor = computed(() => getFileColor(props.file.type))
</script>