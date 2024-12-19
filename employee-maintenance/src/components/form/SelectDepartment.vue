<!-- DepartmentSelect.vue -->
<template>
    <select
        :id="id"
        class="form-select"
        :value="modelValue"
        @input="onInput"
        required
    >
        <option value="" disabled>Select a department</option>
        <option
            v-for="department in departments"
            :key="department.id"
            :value="department.id"
        >
            {{ department.name }}
        </option>
    </select>
</template>
  
<script setup lang="ts">
import { ref, onMounted, defineProps, defineEmits } from 'vue';
import { DepartmentResponse } from '../../models/DepartmentResponse';
import { getDepartments } from '../../services/DepartmentService';
  

  defineProps<{
    modelValue: number | null;
  }>();
  
  const emit = defineEmits(['update:modelValue']);

  const id = `department-select-${Math.random().toString(36).substring(2, 9)}`;

  const departments = ref<DepartmentResponse[]>([]);

  onMounted(async () => {
    try {
      departments.value = await getDepartments();
    } catch (error) {
      console.error('Failed to load departments:', error);
    }
  });

  const onInput = (event: Event) => {
    const target = event.target as HTMLSelectElement;
    emit('update:modelValue', Number(target.value));
  };
  </script>
  
  <style scoped>
 
  </style>
  