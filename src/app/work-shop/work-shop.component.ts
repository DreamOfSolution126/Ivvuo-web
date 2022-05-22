import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../services/account/account.service';
import { CenterService } from '../services/center/center.service';
import { UrlService } from '../services/url/url.service';
import { MsgComponent } from '../msg/msg.component';
import { ConfirmacionComponent } from '../componentes/modales/confirmacion/confirmacion.component';

@Component({
  selector: 'app-work-shop',
  templateUrl: './work-shop.component.html',
  styleUrls: ['./work-shop.component.css']
})
export class WorkShopComponent implements OnInit {

  modalChangePass: any;
  closeResult: string;
  isCollapsed = true;
  pass: any = {
    response: '',
    newPassword: '',
    confirmPassword: ''
  };
  alert: any = {
    type: '',
    msg: ''
  };

  public centroDisponible = [];
  public centroSeleccionado = { _id: '', name: '', configuraciones:{ verOrdenesPorCliente: false } };
  public datosCuenta = { logoNavBar: '', logo: { url: '../../assets/img/logo/logo_mapp.png' } };
  public logo_url = '../../assets/img/logo/logo_mapp.png';
  public user = JSON.parse(localStorage.getItem('user'));

  constructor(
    private urlService: UrlService,
    private accountService: AccountService,
    private centerService: CenterService,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService ) { }

  @ViewChild('chagePassTemplate') chagePassTemplate: ElementRef;

  ngOnInit() {
    this.obtenerCentros();
    this.obtenerCuenta();

    this.urlService.getCenterSelect()
    .subscribe( respuesta => {
      this.centroSeleccionado = respuesta;
    });
  }


  signOut = async () => {
    // const confirmar = window.confirm('Seguro quiere salir de IVVUO?');
    const confirmar = await this.confirmacion(
      'Confirmar',
      'Desea cerrar sesion?',
      'Cancelar',
      'Cerrar sesion'
    );

    if (!confirmar) { return; }

    localStorage.clear();
    this.goTo('/');
  }
  goTo( url: string): void {
    this.router.navigateByUrl(url);
  }

  change(): void {
    const user = {
      password: this.pass.newPassword,
      _id: this.user._id,
      newPassword: this.pass.newPassword,
      confirmPassword: this.pass.newPassword,
      email: this.user.email
    };
    if ( this.pass.newPassword === this.pass.confirmPassword ) {
      this.userService.upDateUser(user)
        .subscribe( change => {
          this.pass.response = JSON.parse(change);
          this.alert.type = 'info';
          this.alert.msg = this.pass.response.msg;
      });
    } else {
      this.alert.type = 'warning';
      this.alert.msg = 'Lo sentimos, las contraseñas no coinciden';
    }
  }

  closeAlert(): void {
    this.alert = [];
  }

  changePassworOn(): void {

    this.modalChangePass = this.modalService.open(this.chagePassTemplate, {
      centered: true
    });

    this.modalChangePass.result.then(( result: any ) => {
      this.closeResult = `Close with ${result}`;
    }, (reason: any ) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  obtenerCentros(): void {
    const params = { centers: this.user.centers };
    this.centerService.obtenerMultiplesCentros( params )
    .subscribe( response => {
      this.centroDisponible = JSON.parse(response);
      this.centroSeleccionado = this.centroDisponible[0];

    }, error => {
      this.msg('Error', 'ocurrió un error al obtener los centros de servicio' );
    } );
  }

  obtenerCuenta(): void {
    const parametros = { id: this.user.account[0] };
    this.accountService.getAccountIdToCenter( parametros )
    .subscribe( respuesta => {
      this.datosCuenta = JSON.parse(respuesta);
      if ( this.datosCuenta.logoNavBar ) {
        this.logo_url = this.datosCuenta.logoNavBar;
      }
    }, error => {
      this.msg('Error', 'ocurrio un erro al obtener la información de la cuenta');
    });
  }

  seleccionarCentro ( seleccionado ): void {
    this.centroSeleccionado = seleccionado;

    if (this.centroSeleccionado._id) {
      this.router.navigate(['workshop_center/dashboard', this.centroSeleccionado._id ]);
    }
  }

  openModal ( modal ): void {
    this.modalService.open( modal, {
      size: 'lg',
      centered: true
    });
  }

  private getDismissReason(reason: any): string {
    if ( reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK ) {
      return 'by clicking backdrop click';
    } else {
      return `whith; ${reason}`;
    }
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
