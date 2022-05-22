import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account-confi',
  templateUrl: './account-confi.component.html',
  styleUrls: ['./account-confi.component.css']
})
export class AccountConfiComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  constructor( private titleService: Title ) { }

  ngOnInit() {
    this.titleService.setTitle(`IVVUO :: Dashboard` );
  }

}
