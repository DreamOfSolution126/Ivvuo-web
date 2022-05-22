import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService  } from '../services/user.service';
import { MsgComponent } from '../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { TipoRol } from '../enum/tipo-rol.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  user = {
    email: '',
    password: ''
  };
  response: any = [];
  message: any = '';
  getUser: any = [];

  constructor( private userService: UserService,
    private titleService: Title,
    private router: Router,
    private modalService: NgbModal ) { }

  ngOnInit() {
    localStorage.setItem('token', '');
    this.titleService.setTitle('IVVUO :: Acceder');
  }

  getNewPass(): void {
    if (this.user.email) {
      this.userService.getNewPass(JSON.stringify(this.user))
    .subscribe( getNewPass => {
      this.msg('Cambio de Contraseña', `Se ha enviado un email con una nueva contraseña a ${this.user.email}`);
    } );
    } else {
      this.msg('Lo sentimos', 'Olvidaste escribir una cotraseña');
    }
  }

  singIn(): void {
    this.response = [];
    this.message = '';
    if (this.user.email) {
      this.userService.singIn(this.user)
    .subscribe( response => {
      this.response = JSON.parse(response);
      this.setLocalStore(response);
    }, err => {
      this.message = err;
    } );

    } else {
      this.msg('Lo sentimos', 'Olvidaste escribir un Correo Electrónico');
    }
  }

  goTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  setLocalStore(token: any): void {
    const tokenSave = JSON.parse(token);

    localStorage.setItem('token', JSON.stringify(tokenSave.token));
    this.getUserByEmail();
  }
  getUserByEmail(): void {
    this.getUser = [];
    this.userService.getUserByEmail(this.user)
    .subscribe( getUserByEmail => {
      this.getUser = JSON.parse(getUserByEmail);
      this.handRoutes(JSON.parse(getUserByEmail)); } );
  }

  handRoutes(user: any): void {
    localStorage.setItem('user', JSON.stringify(user));
    const idPrincipal = user.centers[0];
    if ( user.centers.length < 1  && user.role === 'workshop_customer' ) {
      this.msg(
        'Lo sentimos',
        'Este usuario aún no tiene Centros de Servicio asignados'
      );
      return;
    }
    if (user.active) {

      if ( user.role === TipoRol.CENTRO_SERVICIO && !user.accesos.tableroControl) {

        localStorage.clear();
        this.goTo('/');
        this.msg('No autorizado', 'Este usuario no esta autorizado para el ingreso al tablero de control');

        return;
      }
      switch (user.role) {
        case TipoRol.MANAGER: this.router.navigate(['dashboard']); break;
        case TipoRol.ADMINISTRADOR_CUENTA: this.router.navigate(['account_manager']); break;
        case TipoRol.CENTRO_SERVICIO: this.router.navigate(['workshop_center/dashboard/' + idPrincipal]); break;
        case TipoRol.REPRESENTANTE_MARCA: this.router.navigate(['marca']); break;
      }
    } else {
      this.msg('Lo sentimos', 'Tu usuario no se encuetra activo, por favor contacta al administrador te cuenta.');
    }
  }

  closeAlert() {
    this.message = '';
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
