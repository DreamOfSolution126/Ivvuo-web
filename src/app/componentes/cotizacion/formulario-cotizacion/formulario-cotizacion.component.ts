import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { listaTiposItemCotizacion } from '../../../listas/items-cotizacion';
import { ItemCotizacion, estadoInicialItemContizacion } from '../../../interfaces/cotizacion/item-cotizacion';
import { TiposCotizacion } from '../../../enum/tipos-cotizacion.enum';
import { WorkShopService } from '../../../services/workshop/work-shop.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IActividad } from '../../../interfaces/actividad/actividad';

@Component({
  selector: 'app-formulario-cotizacion',
  templateUrl: './formulario-cotizacion.component.html',
  styleUrls: ['./formulario-cotizacion.component.css']
})

export class FormularioCotizacionComponent implements OnInit {

  public tiposCotizacion = [];
  public cotizacion = [];
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
  @Output() actualizarOrden = new EventEmitter<string>();


  constructor( private ordenesServicio: WorkShopService, private modalServicio: NgbModal ) {
    this.tiposCotizacion = listaTiposItemCotizacion;
    this.nuevoItem = Object.assign( {}, estadoInicialItemContizacion );
  }

  ngOnInit() {
    this.cotizacion = this.itemSeleccionado.cotizacion ? this.itemSeleccionado.cotizacion : [];

    this.calcularTotalCotizacion();
  }

  actualizar = () => {
    this.actualizarOrden.emit('actualizar');
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

    // const existeItem = this.cotizacion.find( (i) => i.referencia === this.nuevoItem.referencia );

    // if ( existeItem ) {

    //   this.errorReferencia = true;
    //   this.errorMensaje = 'Esta referencia ya existe. Intente con otra';

    //   return;
    // }

    this.cotizacion.push( this.nuevoItem );
    this.itemSeleccionado.cotizacion = this.cotizacion;
    this.nuevoItem = Object.assign( {}, estadoInicialItemContizacion );

    this.calcularTotalCotizacion();
  }

  calcularTotalItem = () => {
    if ( this.nuevoItem.cantidad > 0 && this.nuevoItem.valorUnitario > 0 ) {
      this.nuevoItem.valorTotal = this.nuevoItem.cantidad * this.nuevoItem.valorUnitario;
    } else {
      this.nuevoItem.valorTotal = 0;
    }
  }

  calcularTotalCotizacion = () => {

    this.valorTotal = 0;
    this.valorManoDeObra = 0;
    this.valorRepuestos = 0;
    this.valorTercero = 0;

    if ( (this.itemSeleccionado.answer.value === 0) || (this.itemSeleccionado.answer.value === 1) ) {

      console.log('Item seleccionado: ', this.itemSeleccionado);
      if ( this.cotizacion && this.cotizacion.length > 0) {

        for ( const i of this.cotizacion ) {
          this.valorTotal += i.valorTotal;
          if ( i.tipo === TiposCotizacion.MANO_OBRA ) {
            this.valorManoDeObra += i.valorTotal;
          }
          if ( i.tipo === TiposCotizacion.REPUESTO ) {
            this.valorRepuestos += i.valorTotal;
          }
          if ( i.tipo === TiposCotizacion.TERCERO ) {
            this.valorTercero += i.valorTotal;
          }
        }

        this.itemSeleccionado.parts = this.valorRepuestos;
        this.itemSeleccionado.mo = this.valorManoDeObra;
        this.itemSeleccionado.tercero = this.valorTercero;
        this.itemSeleccionado.total = this.valorTotal;
      } else {
        this.valorTotal = 0;
        this.valorManoDeObra = 0;
        this.valorRepuestos = 0;
        this.valorTercero = 0;
      }
    } else {
      this.valorTotal = 0;
      this.valorManoDeObra = 0;
      this.valorRepuestos = 0;
      this.valorTercero = 0;
    }
    this.guardarCambios();

  }

  eliminarItem = ( item: ItemCotizacion ) => {

    const existeItem = this.cotizacion.find( (i: ItemCotizacion) => i.referencia === item.referencia );

    if ( !existeItem ) {
      return;
    }

    const index = this.cotizacion.indexOf( item );
    this.cotizacion.splice( index, 1 );

    this.calcularTotalCotizacion();

  }

  guardarCambios = () => {

    const parametro = { idOrden: this.idOrden, actividad: this.itemSeleccionado }
    this.ordenesServicio.actualizaCotizacion( parametro )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.actualizar();
      }
    }, error => {
      this.msg('Error', error.error.resultadoOperacion );
    } );
  }

  msg(header: string, body: string) {
    const modalRef = this.modalServicio.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
