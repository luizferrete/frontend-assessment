import http from '../http';
import { EmployeeRequest } from '../models/EmployeeRequest';
import { EmployeeResponse } from '../models/EmployeeResponse';

export async function getEmployees(): Promise<EmployeeResponse[]> {
    return await http.get<EmployeeResponse[]>('/Employee');
}

export async function removeEmployee(id: number): Promise<void> {
    return await http.delete<void>(`/Employee/${id}`);
}

export async function createEmployee(employee: EmployeeRequest): Promise<void> {
    return await http.post<void>('/Employee', employee);
}

export async function updateEmployee(id: number, employee: EmployeeRequest): Promise<void> {
    return await http.put<void>(`/Employee/${id}`, employee);
}

export async function updateEmployeeDepartment(employeeId: number, departmentId: number): Promise<void> {
    return await http.patch<void>(`/Employee/${employeeId}/department/${departmentId}`, null);
}