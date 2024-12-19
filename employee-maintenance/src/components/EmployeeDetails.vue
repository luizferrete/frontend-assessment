<template>
  <div 
    class="modal fade show" 
    tabindex="-1" 
    aria-labelledby="employeeDetailsModal" 
    aria-hidden="true"
    v-if="showModal"
    style="display: block; background-color: rgba(0,0,0,0.5)"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="employeeDetailsModal">Employee Details</h5>
          <button 
            type="button" 
            class="btn-close" 
            aria-label="Close" 
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="d-flex border p-3">
            <div class="col-md-3 text-center">
              <Avatar :height="150" :width="150"/>
            </div>

            <div id="employeeDetails" class="flex-grow-1">
              <div class="text-start">
                <h4 class="fw-bold">{{ employee.name || 'Employee Name' }}</h4>
                <p><strong>Employee ID:</strong> {{ employee.id || '-' }}</p>
                <p><strong>Department:</strong> {{ employee.department || '-' }}</p>
                <p><strong>Telephone:</strong> {{ employee.phone || '-' }}</p>
                <p><strong>Address:</strong> {{ employee.address || '-' }}</p>
              </div>
            </div>

            <div class="text-end">
              <h6 class="fw-bold text-secondary">Hire Date</h6>
              <p class="mb-0">{{ formattedHireDate }}</p>
              <p class="text-muted">{{ employee.hiredTime }}</p>
            </div>
          </div>

          <div class="mt-3 d-flex align-items-center">
            <div class="col-md-3">
              <label class="fw-bold" for="departmentSelect">Update Department</label>
            </div>
            <div class="col-md-7 me-1">
              <SelectDepartment v-model="updatedDepartmentId" />
            </div>
            <div class="col-md-2">
              <button class="btn btn-success btn-sm w-100" @click="updateDepartment">Update</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-secondary" 
            @click="closeModal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>

  <ErrorToast :message="errorMessage" @close="errorMessage = null"/>
</template>

<script setup lang="ts">
import { defineProps, computed, ref } from 'vue';
import { EmployeeResponse } from '../models/EmployeeResponse';
import Avatar from './Avatar.vue';
import SelectDepartment from './form/SelectDepartment.vue';
import ErrorToast from './ErrorToast.vue';
import { getErrorMessage } from '../http/errors/errorHandler';
import { useEmployeeStore } from '../stores/employeeStore';

const props = defineProps<{
  employee: EmployeeResponse;
}>();

const emit = defineEmits(['close', 'departmentUpdated']);

const employeeStore = useEmployeeStore();
const showModal = ref(true);
const updatedDepartmentId = ref<number | null>(props.employee.departmentId);
  const errorMessage = ref<string | null>(null);

const closeModal = () => {
  showModal.value = false;
  emit('close');
};

const formattedHireDate = computed(() => {
  const date = new Date(props.employee.hireDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
});

const updateDepartment = async () => {
  if (!updatedDepartmentId.value ||
      updatedDepartmentId.value === props.employee?.departmentId)
    return;

  try {
    await employeeStore.updateDepartment(props.employee.id, updatedDepartmentId.value);
    await employeeStore.getAllEmployees();
    closeModal();
  } catch (error) {
    errorMessage.value = getErrorMessage(error);
  }
}
</script>

<style scoped>

</style>
