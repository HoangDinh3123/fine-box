<template>
    <div
        @click="$emit('click')"
        :class="[
        'flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors',
        active ? 'bg-purple-50 text-purple-600 font-medium' : 'text-gray-700 hover:bg-gray-50'
        ]"
    >
        <span class="text-xl">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
        <span v-if="item.count" class="ml-auto text-sm text-gray-500">{{ item.count }}</span>
    </div>
</template>

<script setup>
    defineProps({
        item: {
            type: Object,
            required: true
        },
        active: {
            type: Boolean,
            default: false
        }
    })

    defineEmits(['click'])
</script>