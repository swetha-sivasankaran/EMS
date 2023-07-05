import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import { ReferenceTbl } from '../_models/referenceTbl';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEmployee } from '../_models/addEmployee';
import { AlertService } from '../_services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenResponse } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
  data!: any;
  user: TokenResponse | null;
// pagination
page: number = 1;
count: number = 5;

  constructor( 
    private formbuilder: FormBuilder,
    private employeeService: EmployeeService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService
  ) {
    this.user = this.accountService.userValue;

  }
  ngOnInit() : void{

   //if it norml employee login should redirect to edit screen
   if(this.user?.roles == "Employee")
   {
     this.router.navigate(['../empl/view/'+this.user.empDetailsID])
   } 

   this.getAllEmployee();


  }


  deleteEmployee(item: any) {
      if (confirm('Are you sure to delete record?'))
        this.employeeService.delete(item.empDetailsID)
        .subscribe({
          next: () => {
              this.alertService.success('Employee detail deleted successfully', { keepAfterRouteChange: true });
              this.router.navigateByUrl('/empl');
              //for page refresh after delete
              window.location.reload();
          },
          error: (error: any) => {
              this.alertService.error(error);
          }

        });
      }

  getAllEmployee(){
    this.employeeService.getAll().subscribe((data: any[]) => {
      this.data = data;
    });
   
}


}