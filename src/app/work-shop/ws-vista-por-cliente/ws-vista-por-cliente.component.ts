import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkShopService } from '../../services/workshop/work-shop.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'app-ws-vista-por-cliente',
  templateUrl: './ws-vista-por-cliente.component.html',
  styleUrls: ['./ws-vista-por-cliente.component.css']
})
export class WsVistaPorClienteComponent implements OnInit {

  public pagina = 1;
  public idCentro: string;
  public clientes: Array<any>;
  public totalClientes: number;
  public filtro: any = {
    nit: '',
    limite: 10,
    salto: 0,
    idCentro: '',
    fechaDesde: moment().subtract( 1, 'month').format('YYYY-MM-DD'),
    fechaHasta: moment().format('YYYY-MM-DD'),
  };
  public intervalo: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private workshopService: WorkShopService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.activateRoute.params
    .subscribe( params => {
      this.idCentro = params.id;
      this.filtro.idCentro = this.idCentro;
      this.obtenerOrdenes();
      this.contarOrdenes();
      this.intervalo = setInterval( () => {
        this.cargarOrdenes();
      }, 60000 );
    } );
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy () {
    clearInterval( this.intervalo );
  }

  obtenerOrdenes = ( ) => {

    this.workshopService.obtenerOrdenesPorCliente( this.filtro )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        this.clientes = data.data;
      }
    }, error => {
      this.mensaje('Error', 'Error al obtener los clientes');
      clearInterval( this.intervalo );
    } );
  }

  contarOrdenes = ( ) => {

    this.workshopService.contarOrdenesPorClienteSinFiltro( this.filtro )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        this.totalClientes = data.data;
      }
    });
  }

  cargarOrdenes = () => {
    this.obtenerOrdenes( );
    this.contarOrdenes();
  }

  cambioPagina = () => {
    this.filtro.salto = (this.pagina - 1) * this.filtro.limite;

    this.obtenerOrdenes();
    this.contarOrdenes();
  }

  mensaje = ( header: string, body: string) => {
    const instancia = this.modalService.open( MsgComponent, {
      size: 'lg',
      centered: true
    });
    instancia.componentInstance.header = header;
    instancia.componentInstance.body = body;

  }

}
