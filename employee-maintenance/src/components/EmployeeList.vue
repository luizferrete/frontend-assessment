<template>
  <div>
      <div v-for="employee in employeeStore.employees" :key="employee.id">
        <EmployeeCard
          :employee="employee"
        />
      </div>
  </div>

  <ErrorToast :message="employeeStore.errorMessage" @close="employeeStore.clearError"/>
</template>
  
<script setup lang="ts">
import { onMounted } from 'vue';
import EmployeeCard from './EmployeeCard.vue';
import ErrorToast from './ErrorToast.vue';
import { useEmployeeStore } from '../stores/employeeStore';

const employeeStore = useEmployeeStore();
 
onMounted(() => {
  employeeStore.getAllEmployees();
});
</script>
  
<style scoped>

</style>
