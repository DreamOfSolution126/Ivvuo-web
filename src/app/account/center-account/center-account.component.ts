import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-center-account',
  templateUrl: './center-account.component.html',
  styleUrls: ['./center-account.component.css']
})
export class CenterAccountComponent implements OnInit {

  constructor() { }

  public user = JSON.parse(localStorage.getItem('user'));
  ngOnInit() {
  }

}
