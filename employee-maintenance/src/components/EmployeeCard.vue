<template>
  <div class="card mb-3 shadow-sm">
    <div class="row g-0 align-items-center">
      <div class="col-md-2 text-center">
        <Avatar />
      </div>

      <div class="col-md-8">
        <div class="card-body py-2">
          <h5 class="card-title mb-1">
            <strong>{{ employee.name }}</strong>
            <small class="text-muted">({{ employee.department }})</small>
          </h5>
          <p class="card-text mb-0">
            <strong>Hire Date</strong>
          </p>
          <p class="card-text">
            {{ formattedHireDate }} 
            <small class="text-muted">({{ employee.hiredTime }})</small>
          </p>
        </div>
      </div>

      <div class="col-md-2 d-flex justify-content-end align-items-center pe-3">
        <button 
          class="btn btn-success btn-sm me-2"
          @click="openModal">
            Details
        </button>
        <span 
          class="text-danger fw-bold"
          style="font-size: 1.2rem; cursor: pointer;"
          @click="remove">
            X
        </span>
      </div>
    </div>
  </div>

  <EmployeeDetails
    v-if="showModal"
    :employee="employee"
    @close="closeModal"
  />

  <ErrorToast :message="errorMessage" @close="errorMessage = null"/>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { EmployeeResponse } from '../models/EmployeeResponse';
import EmployeeDetails from './EmployeeDetails.vue';
import Avatar from './Avatar.vue';
import { removeEmployee } from '../services/EmployeeService';
import { getErrorMessage } from '../http/errors/errorHandler';
import ErrorToast from './ErrorToast.vue';
import { useEmployeeStore } from '../stores/employeeStore';

const props = defineProps<{
  employee: EmployeeResponse;
}>();

const employeeStore = useEmployeeStore();
const errorMessage = ref<string | null>(null);

const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const remove = async () => {
  const isConfirmed = window.confirm('Are you sure you want to remove this employee?');

  if (isConfirmed)
    try {
      await removeEmployee(props.employee.id);
      employeeStore.employees = employeeStore.employees.filter((employee) => employee.id !== props.employee.id);
    }
    catch(error: any) {
      errorMessage.value = getErrorMessage(error);
    }

}

const formattedHireDate = computed(() => {
  const date = new Date(props.employee.hireDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style>
