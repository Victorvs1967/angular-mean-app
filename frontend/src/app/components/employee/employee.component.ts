import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  showModal = false;
  editMode = false;
  empForm!: FormGroup;
  employees!: Employee[];

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.getEmployees();
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex. Victor Smirnov', Validators.required],
      position: ['Ex. Full Stack Development', Validators.required],
      dept: ['Development']
    });
  }

  onAddEmployee = () => this.showModal = true;

  onCloseModal = () => {
    this.showModal = false;
    this.editMode = false;
  };

  getEmployees = () => this.employeeService.getEmployeeList().subscribe((res: Employee[]) => this.employees = res);

  onDeleteEmployee = (id: string) => {
    if (confirm('Do you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(
        res => this.getEmployees(),
        err => console.log(err)
      );
    }
  }

  onUpdateEmployee = (emp: Employee) => {
    this.editMode = true;
    this.showModal = true;
    this.empForm.patchValue(emp);
  }

  onEmpSubmit = () => {
    if (this.empForm.valid) {
      if (this.editMode) { 
        this.employeeService.updateEmployee(this.empForm.value).subscribe(
          res => {
            this.getEmployees();
            this.onCloseModal();
          },
          err => console.log(err)
        );
      } else {
        this.employeeService.addEmployee(this.empForm.value).subscribe(
          res => {
            this.getEmployees();
            this.onCloseModal();
          },
          err => console.log(err)
        );
      }
    } else {
      let key = Object.keys(this.empForm.controls);
      key.filter(data => {
        let control = this.empForm.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      })
    }
  };

}
