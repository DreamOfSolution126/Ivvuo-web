import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listado-ordenes-zona-cliente',
  templateUrl: './listado-ordenes-zona-cliente.component.html',
  styleUrls: ['./listado-ordenes-zona-cliente.component.css']
})
export class ListadoOrdenesZonaClienteComponent implements OnInit {

  constructor() { }

  @Input() ordenes: Array<any>;

  ngOnInit() {
  }

}
