import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.css']
})
export class ProcessComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));

  constructor() { }

  ngOnInit() {
  }

}
