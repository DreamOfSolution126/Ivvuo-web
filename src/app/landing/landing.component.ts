import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  public navbarCollapse: boolean = true;
  constructor( private titleService:Title) { }

  ngOnInit() {
    this.titleService.setTitle('IVVUO :: Digital Inspection')
  }

}
