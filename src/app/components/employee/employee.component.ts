import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import {NgForm} from '@angular/forms';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public employeeService: EmployeeService) {
    this.getEmployees();
  }

  ngOnInit(): void {

    // this.employeeService.getEmployees()
  }

  getEmployees(){
    this.employeeService.getEmployees().subscribe(
      res => {
        this.employeeService.employees = res;
      },
      error => console.log(error))
  }

  addEmployee(form: NgForm){

    if(form.value._id){
      this.employeeService.putEmployee(form.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      )
    }else{
      this.employeeService.createEmployee(form.value).subscribe(
        res => {
          // console.log('hola');
          this.getEmployees();
          form.reset();
        },
        error => console.log(error))
    }
  }

  cleanForm(form: NgForm){
    form.reset();
  }

  deleteEmployee(id: string){
    if (confirm('Seguro?')){
      this.employeeService.deleteEmployee(id).subscribe(
        (res) => {
          this.getEmployees();
        },
        (err) => console.log(err)
      )

    }
  }

  editEmployee(employee: Employee){
    console.log(employee);
    this.employeeService.selectedEmployee = employee;

  }
  //
}
