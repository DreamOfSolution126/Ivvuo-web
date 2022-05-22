import { Component, OnInit, Input } from '@angular/core';
import { ICentro } from '../../../interfaces/centro/centro';

@Component({
  selector: 'app-card-centro',
  templateUrl: './card-centro.component.html',
  styleUrls: ['./card-centro.component.css']
})
export class CardCentroComponent implements OnInit {

  @Input() centro: ICentro;
  constructor() { }

  ngOnInit() {
  }

}
