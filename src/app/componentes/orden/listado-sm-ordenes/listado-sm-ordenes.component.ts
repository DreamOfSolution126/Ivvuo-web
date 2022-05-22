import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listado-sm-ordenes',
  templateUrl: './listado-sm-ordenes.component.html',
  styleUrls: ['./listado-sm-ordenes.component.css']
})
export class ListadoSmOrdenesComponent implements OnInit {

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
