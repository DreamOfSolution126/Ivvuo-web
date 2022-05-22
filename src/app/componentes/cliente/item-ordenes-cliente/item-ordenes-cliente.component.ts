import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-ordenes-cliente',
  templateUrl: './item-ordenes-cliente.component.html',
  styleUrls: ['./item-ordenes-cliente.component.css']
})
export class ItemOrdenesClienteComponent implements OnInit {

  constructor() { }

  @Input() nit: string;
  @Input() nombre: string;

  ngOnInit() {
  }

}
