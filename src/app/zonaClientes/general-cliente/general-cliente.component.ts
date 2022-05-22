import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkShopService } from '../../services/workshop/work-shop.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmacionComponent } from '../../componentes/modales/confirmacion/confirmacion.component';

@Component({
  selector: 'app-general-cliente',
  templateUrl: './general-cliente.component.html',
  styleUrls: ['./general-cliente.component.css']
})
export class GeneralClienteComponent implements OnInit {

  public ruta: string;
  public cargando = true;
  public cuenta;
  public ordenes = [];
  public token = JSON.parse(localStorage.getItem('token'));
  public valoresOrdenes = [];

  constructor(
    private cuentaService: AccountService,
    private ordenesService: WorkShopService,
    private routerService: Router,
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.rutaActiva.url.subscribe( resultado => {
      this.ruta = this.rutaActiva.snapshot.pathFromRoot[1].url[0].path;
      this.consultarCuenta();
    } );
  }
  cerrarSesion = async () => {
    if (await this.confirmacion(
      'Cerrar sesion',
      'Esta seguro que desea cerrar sesion?',
      'Continuar',
      'Cerrar sesion'
    )) {
      localStorage.clear();
      this.routerService.navigate([this.ruta, 'inicioSesion']);
    }
  }

  consultarCuenta = () => {

    const parametros = {
      ruta: this.ruta
    };
    this.cuentaService.obtenerCuentaZonaClientes( parametros )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.cuenta = data.cuenta;
        this.consultarOrdenes();
      } else {
        this.routerService.navigate(['public']);
      }
      setTimeout( () => {
        this.cargando = false;
      }, 3000 );

    }, error => {
      this.cargando = false;
      this.routerService.navigate(['public']);
    } );
  }

  consultarOrdenes = () => {
    const parametros = {
      token: this.token
    };

    this.ordenesService.obtenerOrdenesDeClienteZonaCliente( parametros )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        this.ordenes = data.data;
        this.consultarResumenDeCotizacion();
      } else {
        this.mensaje('Autenticacion', 'Usuario no autenticado');
        this.routerService.navigate([this.ruta, 'inicioSesion']);
      }
    }, error => {
      this.mensaje('Autenticacion', error.error.resultadoOperacion);
      this.routerService.navigate([this.ruta, 'inicioSesion']);
    } );
  }

  consultarResumenDeCotizacion = () => {
    const parametros = {
      token: this.token
    };

    this.ordenesService.obtenerValoresOrdenesClienteZonaCliente( parametros )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        this.valoresOrdenes = data.data;
      }
    }, error => {
      console.log('Error: ', error );
    } );
  }

  mensaje = (header: string, body: string) => {
    const modal = this.modalService.open( MsgComponent, {
      size: 'lg'
    });

    modal.componentInstance.header = header;
    modal.componentInstance.body = body;
  }

  confirmacion = async (header: string, body: string, rechazar: string, confirmar: string): Promise<Boolean> => {

    const modalRef = this.modalService.open( ConfirmacionComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
    modalRef.componentInstance.rechazar = rechazar;
    modalRef.componentInstance.confirmar = confirmar;

    try {
      const resultado = await modalRef.result;
      return resultado;
    } catch ( error ) {
      return error;
    }


  }


}
