import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plans-confi',
  templateUrl: './plans-confi.component.html',
  styleUrls: ['./plans-confi.component.css']
})
export class PlansConfiComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
  }

}
