import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  addEmployee = (emp: Employee) => this.http.post(environment.backUrl, emp);

  getEmployeeList = () => this.http.get<Employee[]>(environment.backUrl);

  deleteEmployee = (id: string) => this.http.delete(`${environment.backUrl}/${id}`);

  updateEmployee = (emp: Employee) => this.http.put(`${environment.backUrl}/${emp._id}`, emp);
}
