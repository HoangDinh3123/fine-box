<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <FileCard
      v-for="file in files"
      :key="file.id"
      :file="file"
      @click="$emit('file-click', file)"
      @action="$emit('file-action', file)"
      @contextmenu="$emit('file-contextmenu', $event, file)"
    />
  </div>
</template>

<script setup>
    import FileCard from './FileCard.vue';

    defineProps({
        files: {
            type: Array,
            required: true
        }
    })

    defineEmits(['file-click', 'file-action', 'file-contextmenu'])
</script>