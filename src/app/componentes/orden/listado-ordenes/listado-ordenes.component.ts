import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-ordenes',
  templateUrl: './listado-ordenes.component.html',
  styleUrls: ['./listado-ordenes.component.css']
})
export class ListadoOrdenesComponent implements OnInit {

  public ruta: string;
  public niveles: number;

  constructor( private rutaActiva: ActivatedRoute ) { }

  @Input() ordenes: Array<any>;

  ngOnInit() {
    this.rutaActiva.url.subscribe( respuesta => {
      this.niveles = respuesta.length;
      if ( this.niveles === 2) {
        this.ruta = '../../Orderdetails/';
      } else if ( this.niveles === 3 ) {
        this.ruta = '../../../Orderdetails/';
      }
    } );
  }



}
