import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';
import { AccountService } from '../services/account/account.service';
import { ConfirmacionComponent } from './../componentes/modales/confirmacion/confirmacion.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  modalChangePass: any;
  closeResult: string;

  pass: any = {
    response: '',
    newPassword: '',
    confirmPassword: ''
  };
  alert: any = {
    type: '',
    msg: ''
  };
  public isCollapsed = true;
  account: any = [];
  public user = JSON.parse(localStorage.getItem('user'));
  public logo_url = '../../assets/img/logo/logo_mapp.png';
  constructor(
    private accountService: AccountService,
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  @ViewChild('chagePassTemplate') chagePassTemplate: ElementRef;

  ngOnInit() {
    this.getDataAccountById();
  }


  goTo(url: string): void {
    this.router.navigateByUrl(url);

  }

  signOut = async () => {

    const validacion = await this.confirmacion(
      'Confirmar',
      'Esta seguro que desea cerrar sesión?',
      'Cancelar',
      'Cerrar sesión'
    );

    if ( !validacion ) {
      return;
    }

    localStorage.clear();
    this.goTo('/');
  }

  // Chage Passwrod Function
  change(): void {
    const user = {
      password: this.pass.newPassword,
      _id: this.user._id,
      newPassword: this.pass.newPassword,
      confirmPassword: this.pass.newPassword,
      email: this.user.email
    };
    if (this.pass.newPassword === this.pass.confirmPassword) {
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

  getDataAccountById(): void {
    const body = { id: this.user.account[0]};
    this.accountService.getAccountIdToCenter(body)
    .subscribe( account => {
      this.account = JSON.parse(account);
      if ( this.account.logoNavBar ) {
        this.logo_url = this.account.logoNavBar;
      }
      localStorage.setItem('accountData', JSON.stringify(this.account));
    }, err => {
      this.alert.msg = 'Ocurrió un error inesperado';
    } );
  }


  // Chage Password Modal
  changePassworOn(): void {
    // this.userToDelet = user
    this.modalChangePass = this.modalService.open(this.chagePassTemplate, {
      centered: true
    });
    this.modalChangePass.result.then((result) => {
      this.closeResult = `Close with ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking backdrop click';
    } else {
      return `whith; ${reason}`;
    }
  }

}
