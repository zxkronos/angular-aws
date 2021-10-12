import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  URL_API = 'http://ec2-3-129-39-30.us-east-2.compute.amazonaws.com/api/employees'

  employees!: Employee[];
  selectedEmployee: Employee ={
    name: '',
    office:'',
    position: '',
    salary: 0
  };
  constructor(private http: HttpClient) {

   }

  getEmployees(){
    return this.http.get<Employee[]>(this.URL_API);
  }

  createEmployee(employee: Employee){
    return this.http.post(this.URL_API, employee, {responseType: 'text'})
  }

  putEmployee(employee: Employee){
    return this.http.put(`${this.URL_API}/${employee._id}`, employee)

  }

  deleteEmployee(_id: string){
    return this.http.delete(`${this.URL_API}/${_id}`)
  }
}
