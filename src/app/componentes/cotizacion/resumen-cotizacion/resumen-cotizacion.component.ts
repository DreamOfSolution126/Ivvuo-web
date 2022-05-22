import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-resumen-cotizacion',
  templateUrl: './resumen-cotizacion.component.html',
  styleUrls: ['./resumen-cotizacion.component.css']
})
export class ResumenCotizacionComponent implements OnInit {

  constructor(
    private modalServicio: NgbModal
  ) { }

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
