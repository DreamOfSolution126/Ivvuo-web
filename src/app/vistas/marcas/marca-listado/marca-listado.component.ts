import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MarcaService } from '../../../services/marca/marca.service';
import { MsgComponent } from '../../../msg/msg.component';
import { IMarca } from '../../../interfaces/marca/marca';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-marca-listado',
  templateUrl: './marca-listado.component.html',
  styleUrls: ['./marca-listado.component.css']
})
export class MarcaListadoComponent implements OnInit {

  public marcas: IMarca[];

  constructor(
    private marcaService: MarcaService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.consultaMarcas();
  }

  abrirModalCrearMarca = ( modal ) => {
    this.modalService.open( modal, {
      centered: true
    } );
  }

  consultaMarcas = () => {
    this.marcaService.consulta()
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.marcas = data.data;
      }
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion );
    });
  }

  manejoEventoActualizar = () => {
    this.consultaMarcas();
  }

  mensaje = ( header: string, body: string) => {
    const instancia = this.modalService.open(MsgComponent, {
      centered: true
    });
    instancia.componentInstance.header = header;
    instancia.componentInstance.body = body;

  }

}
