import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inspeccion-icono',
  templateUrl: './inspeccion-icono.component.html',
  styleUrls: ['./inspeccion-icono.component.css']
})
export class InspeccionIconoComponent implements OnInit {

  @Input() item = {
    type: '',
    answer: {
      answer: '',
      value: ''
    }
  };
  constructor() { }


  ngOnInit() {
  }

}
