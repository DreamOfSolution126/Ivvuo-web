import { Component, OnInit } from '@angular/core';
import { listaTiposIdentificacion } from '../../listas/items-tipos-identificacion';
import { ILista } from '../../interfaces/listas';
import { ICliente, clienteEstadoInicial} from '../../interfaces/cliente/cliente';
import { TipoIdentificacion } from '../../enum/tipo-identificacion.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { ClientesService } from '../../services/cliente/clientes.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registro-cliente',
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent implements OnInit {

  public tiposIdentificacion: ILista[];
  public cliente: ICliente;
  public cuenta;
  public tipoNit: string;
  public confirmarContrasena: string;
  public aceptarTerminosyCondiciones =  false;
  public validacion = {
    error: false,
    mensaje: ''
  };
  public ruta: string;
  public cargando = true;
  constructor(
    private clienteService: ClientesService,
    private cuentaService: AccountService,
    private routerService: Router,
    private rutaActiva: ActivatedRoute,
    private modalService: NgbModal
  ) {
    this.tiposIdentificacion = listaTiposIdentificacion;
    this.cliente = Object.assign({}, clienteEstadoInicial);
    this.tipoNit = TipoIdentificacion.NIT;
  }

  ngOnInit() {
    this.rutaActiva.url.subscribe( resultado => {
      this.ruta = this.rutaActiva.snapshot.pathFromRoot[1].url[0].path;
      this.consultarCuenta();
    } );
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
        this.cliente.cuenta = this.cuenta.cuenta;
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

  registroCliente = () => {

    this.cliente.cuenta = this.cuenta.cuenta;
    this.cliente.creadoDesdeZonaCliente = true;
    this.clienteService.registroClienteZonaClienteSchema( this.cliente )
    .subscribe( (respuesta) => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.mensaje('Registro', 'Se ha registrado exitosamente');
      } else {
        this.mensaje('Registro', data.resultadoOperacion );
      }
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion);
    });
  }

  mensaje = ( header: string, body: string ) => {
    const instanciaModal = this.modalService.open( MsgComponent, {
      size: 'lg',
      centered: true
    });

    instanciaModal.componentInstance.header = header;
    instanciaModal.componentInstance.body = body;
  }

  validarContrasena = () => {

    if ( this.cliente.contrasena ) {
      if ( this.cliente.contrasena.length < 5 ) {
        this.validacion.error = true;
        this.validacion.mensaje = 'La contrasena debe contener al menos 6 caracteres';
      }
    }

    if ( !this.cliente.contrasena || !this.confirmarContrasena ) {
      return;
    }

    if ( this.cliente.contrasena && this.confirmarContrasena ) {
      if ( this.cliente.contrasena !== this.confirmarContrasena ) {
        this.validacion.error = true;
        this.validacion.mensaje = 'Las contrasenas no coinciden';
      }
    }
  }
}
