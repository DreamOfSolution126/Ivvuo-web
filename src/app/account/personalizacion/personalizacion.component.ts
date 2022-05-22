import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personalizacion',
  templateUrl: './personalizacion.component.html',
  styleUrls: ['./personalizacion.component.css']
})
export class PersonalizacionComponent implements OnInit {

  public account = JSON.parse( localStorage.getItem('accountData') );
  public activar = false;
  public validacionRuta = {
    invalidad: false,
    mensaje: ''
  };
  constructor(
    private accountService: AccountService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  actualizarCuenta = () => {

    if ( this.validarRuta() ) {
      return;
    }

    this.accountService.editAccount( this.account )
    .subscribe( respuesta => {
      console.log(respuesta);
      this.obtenerCuenta();
    }, error => {
      this.obtenerCuenta();
      this.msg('Error', 'Ocurrió un error al actualizar la cuenta');
    } );
  }

  obtenerCuenta = () => {
    this.accountService.getAccountById(this.account._id)
    .subscribe( respuesta => {
      this.account = JSON.parse( respuesta );
      localStorage.setItem('accountData', JSON.stringify( this.account ));
    }, error => {
      console.log(error);
    } );
  }

  validarRuta = () => {
    const ruta = this.account.zonaCliente.ruta;
    const estatus = this.account.zonaCliente.estatus;
    let error = false;
    if ( !ruta && estatus ) {
      this.validacionRuta.invalidad = true;
      this.validacionRuta.mensaje = 'El campo no puede estar vacio';
      error = true;
    }

    if ( estatus && ruta.split(' ').length > 1 ) {
      this.validacionRuta.invalidad = true;
      this.validacionRuta.mensaje = 'La ruta no debe contener espacios';
      error = true;
    }

    const expresion = /[A-Za-z0-9]/;
    let caracteresEspeciales = false;
    for (const i of ruta) {
      if ( !expresion.test( i ) ) {
        caracteresEspeciales = true;
      }
    }

    if ( caracteresEspeciales ) {
      this.validacionRuta.invalidad = true;
      this.validacionRuta.mensaje = 'La ruta no debe contener caracteres especiales';
      error = true;
    }

    return error;
  }


  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
