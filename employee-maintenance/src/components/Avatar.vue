<template>
    <div
        class="bg-info d-flex align-items-center justify-content-center"
        :style="{ width: width + 'px', height: height + 'px' }"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style="color: blue;"
            :width="svgSize"
            :height="svgSize"
            fill="currentColor"
            class="bi bi-person-bounding-box"
            viewBox="0 0 16 16"
        >
        <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5M.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5m15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5"/>
        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
        </svg>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps({
  width: {
    type: Number,
    default: 80,
  },
  height: {
    type: Number,
    default: 80,
  },
});

const svgSize = computed(() => `${Math.min(props.width, props.height) * 0.8}px`);
</script>

<style scoped>
</style>