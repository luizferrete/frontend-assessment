import { defineStore } from "pinia";
import { EmployeeResponse } from "../models/EmployeeResponse";
import { getEmployees, updateEmployeeDepartment } from "../services/EmployeeService";
import { getErrorMessage } from "../http/errors/errorHandler";

export const useEmployeeStore = defineStore('employeeStore', {
    state: () => ({
        employees: [] as EmployeeResponse[],
        errorMessage: null as string | null
    }),
    actions: {
        async getAllEmployees () {
            try {
                this.employees = await getEmployees();
            } catch (err: any) {
                this.errorMessage = getErrorMessage(err);
            }
        },
        async updateDepartment(employeeId: number, departmentId: number) {
            try {
              await updateEmployeeDepartment(employeeId, departmentId);
            } catch (err: any) {
              this.errorMessage = getErrorMessage(err);
            }
          },
        clearError() {
            this.errorMessage = null;
        }
    }
})