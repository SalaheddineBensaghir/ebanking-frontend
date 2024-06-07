import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers!: Observable<Array<Customer>>;
  errorMessage!: string;
  searchformGroup!: FormGroup;

  constructor(private customerService:CustomerService,private fb : FormBuilder) {
  }

  ngOnInit(): void{
    this.searchformGroup=this.fb.group({
      keyword : this.fb.control("")
    });
this.handleSearchCustomers();
  }

  handleSearchCustomers(){
let kw = this.searchformGroup?.value.keyword;
this.customers=this.customerService.searchCustomers(kw).pipe(
  catchError(err => {
    this.errorMessage=err.message;
    return  throwError(err);
  })
);
  }

}
