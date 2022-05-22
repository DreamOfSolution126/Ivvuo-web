import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMarca, marcaEstadoInicial } from '../../../interfaces/marca/marca';
import { MarcaService } from '../../../services/marca/marca.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgComponent } from '../../../msg/msg.component';
import { CountryService } from '../../../services/countrys/country.service';

@Component({
  selector: 'app-formulario-marca',
  templateUrl: './formulario-marca.component.html',
  styleUrls: ['./formulario-marca.component.css']
})
export class FormularioMarcaComponent implements OnInit {

  @Input() marca: IMarca;
  @Output() cerrar = new EventEmitter<string>();
  @Output() actualizarListado = new EventEmitter<string>();
  public listadoPaises = [];
  constructor(
    private marcaService: MarcaService,
    private modalService: NgbModal,
    private paiseServicio: CountryService
  ) {
    this.marca = Object.assign({}, marcaEstadoInicial );
  }

  ngOnInit() {
    this.consultaPaises();
  }

  actualizar = () => {
    this.actualizarListado.emit();
  }

  cerrarModal = () => {
    this.cerrar.emit();
  }

  crear = () => {
    this.marcaService.crear( this.marca )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      this.mensaje('Informacion', data.resultadoOperacion );
      this.actualizar();
      this.cerrarModal();
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion );
    });
  }

  consultaPaises = () => {
    this.listadoPaises = this.paiseServicio.getCountrys();
  }

  mensaje = ( header: string, body: string) => {
    const instancia = this.modalService.open(MsgComponent, {
      centered: true
    });
    instancia.componentInstance.header = header;
    instancia.componentInstance.body = body;

  }

}
