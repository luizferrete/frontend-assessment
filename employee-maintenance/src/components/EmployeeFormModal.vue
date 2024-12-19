<template>
    <div
      class="modal fade show"
      tabindex="-1"
      aria-hidden="true"
      style="display: block; background-color: rgba(0, 0, 0, 0.5)"
      v-if="showModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">New Employee</h5>
            <button
              type="button"
              class="btn-close"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="submitForm">
              <div class="mb-3">
                <label for="name" class="form-label">First Name</label>
                <input
                  type="text"
                  id="name"
                  class="form-control"
                  v-model="form.name"
                  required
                  maxlength="128"
                />
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  class="form-control"
                  v-model="form.lastName"
                  required
                  maxlength="128"
                />
              </div>
              <div class="mb-3">
                <label for="hireDate" class="form-label">Hire Date</label>
                <input
                  type="date"
                  id="hireDate"
                  class="form-control"
                  v-model="form.hireDate"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="departmentId" class="form-label">Department</label>
                <SelectDepartment
                  v-model="form.departmentId"
                />
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Phone</label>
                <input
                  type="text"
                  id="phone"
                  class="form-control"
                  v-model="form.phone"
                  required
                  maxlength="24"
                />
              </div>
              <div class="mb-3">
                <label for="address" class="form-label">Address</label>
                <input
                  type="text"
                  id="address"
                  class="form-control"
                  v-model="form.address"
                  required
                  maxlength="255"
                />
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="closeModal">
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <ErrorToast :message="errorMessage" @close="errorMessage = null"/>
  </template>
  
<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import { getErrorMessage } from '../http/errors/errorHandler';
import { EmployeeRequest } from '../models/EmployeeRequest';
import { createEmployee } from '../services/EmployeeService';
import ErrorToast from './ErrorToast.vue';
import SelectDepartment from './form/SelectDepartment.vue';
import { useEmployeeStore } from '../stores/employeeStore';
  
const emit = defineEmits(['close', 'employeeAdded']);

const employeeStore = useEmployeeStore();
const showModal = ref(true);
const errorMessage = ref<string | null>(null);

const form = ref<EmployeeRequest>({
    name: '',
    lastName: '',
    hireDate: '',
    departmentId: null,
    phone: '',
    address: ''
});

  
const closeModal = () => {
    emit('close');
    showModal.value = false;
};

const submitForm = async () => {
    try {
        await createEmployee(form.value);
        alert('Employee created successfully!');

        employeeStore.getAllEmployees();
        closeModal();
    } catch (error) {
        errorMessage.value = getErrorMessage(error);
    }
};
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
  