import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resumen-cotizacion-zona-cliente',
  templateUrl: './resumen-cotizacion-zona-cliente.component.html',
  styleUrls: ['./resumen-cotizacion-zona-cliente.component.css']
})
export class ResumenCotizacionZonaClienteComponent implements OnInit {

  constructor( private modalServicio: NgbModal) { }

  @Input() valoresOrdenes: Array<any>;
  ngOnInit() {
  }

  abrirModal = ( modal ) => {
    const instanciaModal = this.modalServicio.open(modal, {
      size: 'lg',
      centered: true
    });
  }

}
