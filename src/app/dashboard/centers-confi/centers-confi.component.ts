import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-centers-confi',
  templateUrl: './centers-confi.component.html',
  styleUrls: ['./centers-confi.component.css']
})
export class CentersConfiComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  constructor() { }

  ngOnInit() {
  }

}
