import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { ICuenta, cuentaEstadoInicial } from '../../interfaces/cuenta/cuenta';
import { UserService } from '../../services/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  public cuentaLocalStorage = JSON.parse( localStorage.getItem('accountData') );
  public cuenta: ICuenta;
  public usuarios = [];
  public usuarioSeleccionado: any;

  @ViewChild('seleccionarUsuario') usuarioModal: ElementRef;

  constructor(
    private cuentaService: AccountService,
    private usuarioService: UserService,
    private modalService: NgbModal
  ) {
    this.cuenta = Object.assign({}, cuentaEstadoInicial );
  }

  ngOnInit() {
    this.obtenerCuenta();
  }

  manejarEventoSeleccioanrUsuario = ( usuario: any ) => {
    this.usuarioSeleccionado = usuario;
    this.abrirModal( this.usuarioModal );
  }

  obtenerCuenta = () => {
    this.cuentaService.getAccountById( this.cuentaLocalStorage._id )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      this.cuenta = data;
      this.obtenerUsuarios();
    }, error => {
      console.log( error );
    } );
  }

  obtenerUsuarios = () => {
    const parametros = { cuenta: this.cuenta._id };
    this.usuarioService.obtenerUsuariosPorCuenta( parametros )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      if ( data.estatus ) {
        this.usuarios = data.data;
      } else {
        console.log( data.resultadoOperacion );
      }
    }, error => {
      console.log('Error: ', error );
    } );
  }

  abrirModal = ( modal ) => {
    this.modalService.open( modal, {
      centered: true,
      size: 'lg'
    });
  }

}
