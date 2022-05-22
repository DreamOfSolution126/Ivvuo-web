import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TiposCotizacion } from '../../../enum/tipos-cotizacion.enum';
import { IActividad } from '../../../interfaces/actividad/actividad';
import { estadoInicialItemContizacion, ItemCotizacion } from '../../../interfaces/cotizacion/item-cotizacion';
import { listaTiposItemCotizacion } from '../../../listas/items-cotizacion';
import { MsgComponent } from '../../../msg/msg.component';

@Component({
  selector: 'app-formulario-cotizacion-actividad',
  templateUrl: './formulario-cotizacion-actividad.component.html',
  styleUrls: ['./formulario-cotizacion-actividad.component.css']
})
export class FormularioCotizacionActividadComponent implements OnInit {

  public tiposCotizacion = [];
  public nuevoItem: ItemCotizacion;
  public valorTotal: number;
  public valorManoDeObra: number;
  public valorRepuestos: number;
  public valorTercero: number;
  public errorReferencia = false;
  public errorValorUnitario = false;
  public errorMensaje = '';

  @Input() idOrden: string;
  @Input() itemSeleccionado: IActividad;
  public cotizacion: ItemCotizacion[];
  @Output() agregarItem: EventEmitter<IActividad> = new EventEmitter();


  constructor(
    private modalServicio: NgbModal ) {
    this.tiposCotizacion = listaTiposItemCotizacion;
    this.nuevoItem = Object.assign( {}, estadoInicialItemContizacion );
  }

  ngOnInit() {
    this.cotizacion = this.itemSeleccionado.cotizacion ? this.itemSeleccionado.cotizacion : [];

    // this.calcularTotalCotizacion();
  }

  agregrarItemACotizacion = () => {

    if ( !this.nuevoItem.referencia && !this.nuevoItem.descripcion ) {
      this.errorReferencia = true;
      this.errorMensaje = 'Completa la referencia';
      return;
    }

    if ( this.nuevoItem.valorUnitario < 1 ) {
      this.errorValorUnitario = true;
      this.errorMensaje = 'El valor unitario debe ser mayor a 0';
      return;
    }

    const existeItem = this.cotizacion.find( (i) => i.referencia === this.nuevoItem.referencia );

    if ( existeItem ) {

      this.errorReferencia = true;
      this.errorMensaje = 'Esta referencia ya existe. Intente con otra';

      return;
    }

    this.cotizacion.push( this.nuevoItem );
    this.itemSeleccionado.cotizacion = this.cotizacion;
    this.nuevoItem = Object.assign( {}, estadoInicialItemContizacion );

    // this.calcularTotalCotizacion();
    this.guardarCambios();
  }

  calcularTotalItem = () => {
    if ( this.nuevoItem.cantidad > 0 && this.nuevoItem.valorUnitario > 0 ) {
      this.nuevoItem.valorTotal = this.nuevoItem.cantidad * this.nuevoItem.valorUnitario;
    } else {
      this.nuevoItem.valorTotal = 0;
    }
  }


  eliminarItem = ( item: ItemCotizacion ) => {

    const existeItem = this.cotizacion.find( (i: ItemCotizacion) => i.referencia === item.referencia );

    if ( !existeItem ) {
      return;
    }

    const index = this.cotizacion.indexOf( item );
    this.cotizacion.splice( index, 1 );

    this.guardarCambios();

  }

  guardarCambios = () => {

    console.log('Item seleccionado: ', this.itemSeleccionado)
    this.agregarItem.emit( this.itemSeleccionado);
  }

  msg(header: string, body: string) {
    const modalRef = this.modalServicio.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }


}
