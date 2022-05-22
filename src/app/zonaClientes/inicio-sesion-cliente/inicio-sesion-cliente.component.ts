import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { listaTiposIdentificacion } from '../../listas/items-tipos-identificacion';
import { ILista } from '../../interfaces/listas';
import { ClientesService } from '../../services/cliente/clientes.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-inicio-sesion-cliente',
  templateUrl: './inicio-sesion-cliente.component.html',
  styleUrls: ['./inicio-sesion-cliente.component.css']
})
export class InicioSesionClienteComponent implements OnInit {

  public ruta: string;
  public cuenta;
  public cargando = true;
  public tiposIdentificacion: ILista[];
  public cliente = {
    cuenta: '',
    identificacion: {
      tipo: '',
      numero: ''
    },
    contrasena: '',
    aceptarTerminosyCondiciones: false
  };
  public validacion = {
    error: false,
    mensaje: ''
  };
  public recuperarContrasenaPayload = {
    cuenta: '',
    identificacion: {
      numero: '',
      tipo: ''
    },
    email: ''
  };
  public intentosDeIngreso = 0;
  public cargaEnvioCorreo = false;
  constructor(
    private clienteService: ClientesService,
    private rutaActiva: ActivatedRoute,
    private cuentaService: AccountService,
    private routerService: Router,
    private modalService: NgbModal,
    private tituloService: Title
  ) {
    this.tiposIdentificacion = listaTiposIdentificacion;
  }

  ngOnInit() {

    this.rutaActiva.url.subscribe( resultado => {
      this.ruta = this.rutaActiva.snapshot.pathFromRoot[1].url[0].path;
      this.consultarCuenta();
    } );

  }

  abrirModal = ( modal ) => {
    this.modalService.open( modal, {
      centered: true
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
        this.tituloService.setTitle( data.cuenta.zonaCliente.nombreComercial + '- Zona clientes' );
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

  iniciarSesion = () => {
    this.cliente.cuenta = this.cuenta.cuenta;
    if ( this.validarFormulario()) {
      return;
    }

    this.validarIntentos();

    this.clienteService.iniciarSesion( this.cliente )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        localStorage.setItem('token', JSON.stringify( data.data ));
        this.routerService.navigate([this.ruta, 'principal']);
        this.intentosDeIngreso = 0;
      } else {
        this.mensaje('Iniciar sesion', data.resultadoOperacion );
        this.intentosDeIngreso += 1;
      }
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion );
    });

  }

  recuperarContrasena = () => {

    this.recuperarContrasenaPayload.cuenta = this.cuenta.cuenta;
    if (
      !this.recuperarContrasenaPayload.email ||
      !this.recuperarContrasenaPayload.identificacion.tipo ||
      !this.recuperarContrasenaPayload.identificacion.numero
      ) {
        this.mensaje('Completa formulario', 'Por favor complete el formulario');
        return;
      }

    this.cargaEnvioCorreo = true;

    this.clienteService.enviarMensajeRestablecerContrasena( this.recuperarContrasenaPayload )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.mensaje('Informacion', data.resultadoOperacion );
      } else {
        this.mensaje('Informacion', data.resultadoOperacion );
      }
      this.cargaEnvioCorreo = false;
    }, error => {
      this.cargaEnvioCorreo = false;
      this.mensaje('Lo sentimos Ocurri un error', error.error.resultadoOperacion );
    } );

    console.log('Payload: ', this.recuperarContrasenaPayload);
  }

  validarFormulario = () => {

    if (!this.cliente.identificacion.tipo || !this.cliente.identificacion.numero ) {
      this.validacion.error = true;
      this.validacion.mensaje = 'Seleccione el tipo y escriba el numero de identificacion';
    }

    if (!this.cliente.contrasena || this.cliente.contrasena.length < 4) {
      this.validacion.error = true;
      this.validacion.mensaje = 'Debe escribir una contrasena valida';
    }

    if (!this.cliente.aceptarTerminosyCondiciones) {
      this.validacion.error = true;
      this.validacion.mensaje = 'Acepte los terminos y condiciones';
    }

    return this.validacion.error;
  }

  validarIntentos = () => {
    if ( this.intentosDeIngreso > 3 ) {
      this.mensaje(
        'Inicio de sesion invalidos',
        'Recuerde que debe colocar el numero de identificacion y tipo, o intente recuperar su contrasena'
      );
    }
  }

  mensaje = (header: string, body: string) => {
    const modal = this.modalService.open( MsgComponent, {
      centered: true
    });

    modal.componentInstance.header = header;
    modal.componentInstance.body = body;
  }

}
