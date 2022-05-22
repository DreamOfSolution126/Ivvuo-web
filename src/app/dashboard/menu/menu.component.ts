import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlTree } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { CenterService } from '../../services/center/center.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  public cuentas: number;
  public centros: number;
  public usuarios: number;
  constructor(
    private router: Router,
    private cuentaService: AccountService,
    private centroService: CenterService,
    private usuarioService: UserService,
  ) { }

  ngOnInit( ) {
    this.consultarCuentas();
    this.consultaCentros();
    this.consultaUsuarios();
  }
  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  consultarCuentas = () => {
    this.cuentaService.countAccount()
    .subscribe( respuesta => {
      this.cuentas = JSON.parse(respuesta).msg;
    });
  }

  consultaCentros = () => {
    this.centroService.countCenter()
    .subscribe( respuesta => {
      this.centros = JSON.parse(respuesta).count;
    });
  }

  consultaUsuarios = () => {
    this.usuarioService.contarUsuarios()
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta )
      if ( data.estatus ) {
        this.usuarios = data.data;
      }
    }, error => {
      console.log( error );
    });
  }

}
