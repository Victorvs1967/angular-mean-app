import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  showModal = false;

  constructor() { }

  ngOnInit(): void {
  }

  onAddEmployee = () => {};

  onCloseModal = () => {};

}
