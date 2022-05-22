import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from '../../services/cliente/clientes.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-recuperar-contrasena-cliente',
  templateUrl: './recuperar-contrasena-cliente.component.html',
  styleUrls: ['./recuperar-contrasena-cliente.component.css']
})
export class RecuperarContrasenaClienteComponent implements OnInit {

  public payload = {
    contrasena: '',
    token: ''
  };
  public token: string;
  public confirmarContrasena = '';
  public validacion = {
    error: false,
    mensaje: ''
  };
  constructor(
    private routerService: Router,
    private clienteService: ClientesService,
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute
    ) { }

  ngOnInit() {
    this.rutaActiva.params.subscribe( parametros => {
      this.token = parametros.token;
    });
  }

  cambiarContrasena = () => {
    if ( this.validacion.error ) {
      return;
    }

    this.payload.token = this.token;

    this.clienteService.cambiarContrasenaZonaCliente( this.payload )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        this.mensaje('Contrasena actualizada', data.resultadoOperacion );
        setTimeout( () => {
          this.routerService.navigate(['../', data.ruta ]);
        }, 3000 );

      } else {
        this.mensaje('Lo sentimos', data.resultadoOperacion );
      }
    }, error => {
      this.mensaje('Error', 'Ocurrio un error al actualizar la contrasena');
    });
  }

  mensaje = (header: string, body: string ) => {
    const instancia = this.modalService.open( MsgComponent, {
      centered: true
    });

    instancia.componentInstance.header = header;
    instancia.componentInstance.body = body;

  }

  validarContrasena = () => {

    if ( this.payload.contrasena ) {
      if ( this.payload.contrasena.length < 5 ) {
        this.validacion.error = true;
        this.validacion.mensaje = 'La contrasena debe contener al menos 6 caracteres';
      }
    }

    if ( !this.payload.contrasena || !this.confirmarContrasena ) {
      return;
    }

    if ( this.payload.contrasena && this.confirmarContrasena ) {
      if ( this.payload.contrasena !== this.confirmarContrasena ) {
        this.validacion.error = true;
        this.validacion.mensaje = 'Las contrasenas no coinciden';
      }
    }
  }

}
