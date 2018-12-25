import { Component, OnInit } from '@angular/core';
import {Employee} from "./data/employee"; // important !
import { EmployeeService } from './employee.service';
import {Router} from "@angular/router";
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
declare var $: any;

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {

  employees : Employee[];
  filteredEmployees : Employee[];
  hidden : boolean;
  getEmployeeSub : any;
  $: any;
  loadingError : boolean; 

  constructor(
    private eService : EmployeeService,
    private router : Router
  ) {
    this.employees = [];
    this.filteredEmployees = [];
    this.getEmployeeSub = "";
    this.hidden = false;
    this.loadingError = false;
   }

  ngOnInit() {
    this.getEmployeeSub = this.eService.getEmployees().subscribe((employees) =>{
      this.employees = employees;
      this.filteredEmployees = employees;
    },() => {
      this.loadingError = true;
    })
  }
  routeEmployee(id : string){
    this.router.navigate(["/employee", id]);
  }

  // Filter function has a problem... Does not work
  onEmployeeSearchKeyUp(event: any){
    let substring : string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) => ((e.FirstName.toLowerCase().indexOf(substring) !== -1 ) || (e.LastName.toLowerCase().indexOf(substring) !== -1)))
  }
  
  ngOnDestroy(){
    this.getEmployeeSub.unsubscribe();
  }

}