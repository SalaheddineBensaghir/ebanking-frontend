import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent implements OnInit{

  accountFormGroup!: FormGroup;
  currentPage : number=0;
  pageSize : number=5;
  accountObservable !: Observable<AccountDetails>;
  operationFromGroup !: FormGroup;
  constructor(private fb : FormBuilder,private  accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup=this.fb.group({
      accountId : this.fb.control('')
    });
    this.operationFromGroup=this.fb.group({
      operationType : this.fb.control(null),
      amount : this.fb.control(0),
      description : this.fb.control(null)
    })
  }




  handleSearchAccount() {
    let accountId : string = this.accountFormGroup.value.accountId;
this.accountObservable= this.accountService.getAccount(accountId,this.currentPage,this.pageSize);
  }

  gotoPage(page: number) {
    this
      .currentPage=page;
    this.handleSearchAccount();
  }
}
