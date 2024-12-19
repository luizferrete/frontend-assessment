<template>
    <div 
      v-if="message" 
      class="toast-container position-fixed bottom-0 end-0 p-3" 
      style="z-index: 1100"
    >
      <div 
        class="toast show align-items-center text-white bg-danger border-0" 
        role="alert" 
        aria-live="assertive" 
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            {{ message }}
          </div>
          <button 
            type="button" 
            class="btn-close btn-close-white me-2 m-auto" 
            aria-label="Close"
            @click="closeToast"
          ></button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    message: string | null;
  }>();
  const emit = defineEmits(['close']);
  
  const closeToast = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .toast-container {
    z-index: 9999;
  }
  </style>
  