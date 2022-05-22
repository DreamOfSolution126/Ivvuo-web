import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { ConfirmacionComponent } from '../../../componentes/modales/confirmacion/confirmacion.component';
import { MarcaService } from '../../../services/marca/marca.service';
import { IMarca } from '../../../interfaces/marca/marca';
import { MsgComponent } from '../../../msg/msg.component';
import { ICentro } from '../../../interfaces/centro/centro';
import * as moment from 'moment';
import { UrlService } from '../../../services/url/url.service';


@Component({
  selector: 'app-marca-cliente',
  templateUrl: './marca-cliente.component.html',
  styleUrls: ['./marca-cliente.component.css']
})
export class MarcaClienteComponent implements OnInit {

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
  public logo_url = '../../assets/img/logo/logo_horizontal.png';
  public datosMarca: IMarca;
  public datosCentros: ICentro[];
  public fechas = {
    desde: moment( `${moment().format('YYYY-MM-')}01` ).format('YYYY-MM-DD'),
    hasta: moment( `${moment().format('YYYY-MM-')}01` ).add(1, 'month').subtract(1, 'minute').format('YYYY-MM-DD')
  };
  public server: string = this.urlService.host();

  constructor(
    private router: Router,
    private marcaService: MarcaService,
    private modalService: NgbModal,
    private userService: UserService,
    private urlService: UrlService
  ) { }

  @ViewChild('chagePassTemplate') chagePassTemplate: ElementRef;

  ngOnInit() {
    this.obtenerMarcaPorId();
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
    } else {
      localStorage.clear();
      this.goTo('/');
    }
  }

  // Chage Passwrod Function
  change(): void {
    const user = {
      password: this.pass.newPassword,
      _id: this.user._id,
      newPassword: this.pass.newPassword,
      confirmPassword: this.pass.newPassword,
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

  obtenerMarcaPorId = async () => {
    const payload = { id: this.user.marca };
    this.marcaService.consultaPorIdCentros( payload )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );

      if ( data.estatus ) {
        this.datosMarca = data.data.datosMarca;
        this.datosCentros = data.data.datosCentros;
        this.logo_url = this.datosMarca.logo.url;
      } else {
        this.msg('Lo sentimos', data.resultadoOperacion );
      }
    }, error => {
      this.msg('Lo sentimos', 'Ocurrio un error al obtener los datos de la marca' );
    });
  }

  reporte = () => {
    this.marcaService.reporte()
    .subscribe( ( success ) => {
      console.log(success );
    }, error => {
      console.log(error);
    } );
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
