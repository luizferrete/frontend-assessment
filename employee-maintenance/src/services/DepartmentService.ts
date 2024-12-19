import http from '../http';
import { DepartmentResponse } from '../models/DepartmentResponse';

export async function getDepartments(): Promise<DepartmentResponse[]> {
    return await http.get<DepartmentResponse[]>('/department');
}