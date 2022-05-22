import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkShopService } from '../../services/workshop/work-shop.service';
import { MsgComponent} from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ws-cliente-detalles',
  templateUrl: './ws-cliente-detalles.component.html',
  styleUrls: ['./ws-cliente-detalles.component.css']
})
export class WsClienteDetallesComponent implements OnInit {

  public identificacion: string;
  public usuario = JSON.parse(localStorage.getItem('user'));
  public cuenta = this.usuario.account[0];
  public centro: string;
  public identificacionCliente: string;
  public ordenes = [];
  public valoresOrdenes: any;

  constructor(
    private activeRouter: ActivatedRoute,
    private OrdenesService: WorkShopService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.activeRouter.params.subscribe( params => {
      this.identificacion = params.id;
      this.centro = params.idCentro;

      this.obtenerOrdenes();
      this.consultaValoresCotizacion();
    });
  }

  obtenerOrdenes = () => {
    const parametro = {
      identificacion: this.identificacion,
      cuenta: this.cuenta,
      centro: this.centro
    };
    this.OrdenesService.obtenerOrdenesDeCliente( parametro )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );

      if ( data.estatus ) {
        this.ordenes = data.data;
      }
    }, error => {
      this.mensaje('Error', 'Error al consultar las ordenes');
    });
  }

  consultaValoresCotizacion = () => {
    const parametro = {
      identificacion: this.identificacion,
      cuenta: this.cuenta,
      centro: this.centro
    };
    this.OrdenesService.obtenerValoresOrdenesCliente( parametro )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );

      if ( data.estatus ) {
        this.valoresOrdenes = data.data;
      }
    }, error => {
      this.mensaje('Error', 'Error al consultar las ordenes');
    });
  }

  mensaje = (header: string, body: string) => {
    const instanciaModal = this.modalService.open( MsgComponent, {
      size: 'lg',
      centered: true,
    } );
    instanciaModal.componentInstance.header = header;
    instanciaModal.componentInstance.body = body;
  }

}
