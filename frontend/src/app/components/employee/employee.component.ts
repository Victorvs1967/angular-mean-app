import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.empForm = this.fb.group({
      _id: [''],
      name: ['Ex. Victor Smirnov', Validators.required],
      position: ['Ex. Full Stack Development', Validators.required],
      dept: ['Development']
    });
  }

  onEmpSubmit = () => {
    if (this.empForm.valid) {
      this.employeeService.addEmployee(this.empForm.value).subscribe(
        res => console.log(res),
        err => console.log(err)
      );
      if (this.editMode) {} else {}
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

  onAddEmployee = () => this.showModal = true;

  onCloseModal = () => this.showModal = false;

}
