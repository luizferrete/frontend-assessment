<template>
  <div id="app" class="container-fluid p-0 h-100">
    <HeaderComponent />
    
    <div class="container mt-5 pt-3">
      <button class="btn btn-success btn-sm me-2 mb-2" @click="openModal">
        New Employee
      </button>
      <EmployeeList ref="employeeList" />
    </div>

    <EmployeeFormModal
      v-if="showFormModal"
      @close="closeModal"
      @employeeAdded="updateList"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EmployeeList from './components/EmployeeList.vue';
import HeaderComponent from './components/HeaderComponent.vue';
import EmployeeFormModal from './components/EmployeeFormModal.vue';

const showFormModal = ref(false);
const employeeList = ref();

const openModal = () => {
  showFormModal.value = true;
};

const closeModal = () => {
  showFormModal.value = false;
};

const updateList = () => {
  if(employeeList.value)
    employeeList.value.getAllEmployees();
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

#app {
  height: 100%;
}
</style>
