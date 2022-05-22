import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  filter: any = {
    active: true,
    nit: ''
  };
  accounts: any = [];
  constructor(private accountService: AccountService, private router: Router) { }


  ngOnInit() {
    this.getAccount();
  }

  getAccount(): void {
    this.accountService.getAccount(this.filter)
    .subscribe( account => {
      this.accounts = JSON.parse(account);
    });
  }

  info(account: any): void {
    const id = account._id;
    this.router.navigateByUrl('/dashboard/accountConfi/accountDetails/' + id);
  }

}
