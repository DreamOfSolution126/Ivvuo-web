import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';

import { PlansService } from '../../../services/plans/plans.service';
import { AccountService } from '../../../services/account/account.service';
import { CenterService } from '../../../services/center/center.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal, ModalDismissReasons  } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { UrlService } from '../../../services/url/url.service';
import { CountryService } from '../../../services/countrys/country.service';
import { ICuenta, cuentaEstadoInicial } from '../../../interfaces/cuenta/cuenta';
import { listaItemTiposCalle } from '../../../listas/items-tipos-calle';
import { ILista } from '../../../interfaces/listas';
import { ICentro, centroEstadoInicial } from '../../../interfaces/centro/centro';
import { EVENTOS } from '../../../enum/eventos.enum';
import { IUsuario, usuarioEstadoInicial } from '../../../interfaces/usuario/usuario';
@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  account: ICuenta;
  public url = this.urlService.host();
  public domain = this.urlService.domain();
  public listaCalle: ILista[];

  public seeEditAccount = false;
  public seeEditPlan = false;
  contact: any = {
    name: '',
    position: '',
    email: '',
    telephone: '',
    access: true
  };
  public progress = 0;
  page: any = 1;
  skip: any = 0;
  limitSelect: any = 20;
  plan: any = [];
  plans: any = [];
  accounts: any = [];
  users: Array<IUsuario> = [];
  accountId: any;
  viewCenterForm = false;
  public centroSeleccionado: ICentro;
  public eventoCentro: string;
  user: IUsuario;
  newPass: any = '';
  repeat_newPass: any = '';
  typeUser: any = 'workshop_customer';

  planSelect: any;
  count: any = [];
  centers: any = [];
  public menu = {
    activo: 'centros'
  };

  closeResult: string;

  userSelect: IUsuario;
  public newPassword: any;
  public newRepeat_password: any;
  public imgPreview: any = 'https://ivvuo.com.co/assets/img/logo/logo_mapp.png';
  public dataImg: any = { name: '', size: '', type: '' };
  public countrys = this.countryService.getCountrys();

  uploader: FileUploader = new FileUploader({
    url: this.domain + 'upload_logos.php'
  });

  constructor(
    private countryService: CountryService,
    private activeRoute: ActivatedRoute,
    private accountService: AccountService,
    private planService: PlansService,
    private centerService: CenterService,
    private modalService: NgbModal,
    private urlService: UrlService,
    private userService: UserService) {
      this.user = Object.assign( {}, usuarioEstadoInicial );
      this.userSelect = Object.assign( {}, usuarioEstadoInicial );
      this.listaCalle = listaItemTiposCalle;
      this.account = Object.assign({}, cuentaEstadoInicial );
      this.centroSeleccionado = Object.assign({}, centroEstadoInicial );
    }

  ngOnInit() {
    this.activeRoute.params.subscribe( (params: Params) => {
      this.accountId = params['id'];
      this.accountService.getAccountById(this.accountId)
      .subscribe( account => {
        this.account = JSON.parse(account);

        this.imgPreview = this.account.logo.url;
        this.planSelect = this.account.plan;
        this.getPlan();
        this.getCount();
        this.getCenter(this.skip, this.limitSelect);
        this.getAllPlans();
        this.getUserById();
        this.getCountById();
      });

    } );
  }

  changeCountry(): void {
    for (const i of this.countrys) {
      if (this.account.country === i.nombre) {
        this.account.code_country = i.iso2;
        this.account.phone_code = i.phone_code;
      }
    }
    console.log(this.account);
  }

  getCenter(skip: any, limit: any): void {
    const item = { id: this.accountId, skip: 0, limit: 10 };
    this.centerService.getCenterById(item)
    .subscribe( centers => {
      this.centers = JSON.parse(centers);
    } );
  }

  getPlan(): void {
    this.planService.getPlanById(this.account.plan)
      .subscribe( plan => {
        this.plan = JSON.parse(plan);
      } );
  }

  getDataPage(): void {
    this.skip = (this.page - 1) * this.limitSelect;
    this.getCenter(this.skip, this.limitSelect);
  }


  getAllPlans(): void {
    this.planService.getPlans()
    .subscribe( plans => {
      this.plans = JSON.parse(plans);
    } );
  }

  createCenter(): void {
    if (
      this.centroSeleccionado.name &&
      this.centroSeleccionado.zone &&
      this.centroSeleccionado.direccion.direccion &&
      this.centroSeleccionado.direccion.ciudad &&
      this.centroSeleccionado.direccion.departamento &&
      this.centroSeleccionado.direccion.pais &&
      this.centroSeleccionado.telefono.indicativo &&
      this.centroSeleccionado.telefono.numero
      ) {
      this.centroSeleccionado.account = this.accountId;
      this.centerService.newCenter(this.centroSeleccionado)
      .subscribe( (center, ) => {
        this.msg('Genial', 'El centro de servicio se ha creado con exito');
        this.getCenter(this.skip, this.limitSelect);
        this.centroSeleccionado = Object.assign({}, centroEstadoInicial );
        this.getCount();
      }, (err) => {
        this.msg(
          'Lo sentimos',
          `Ha ocurrido un error, el Centro de Servicio no se ha creado, revisa el formulario y vuelve a intentarlo` + err);
      });
    } else {
      this.msg('¡Ups!', 'Creemos que olvidaste algunos campos, por favor completalos y luego guarda el centro de servicio');
    }

  }

  seleccionarCentro( centro: ICentro): void {
    this.centroSeleccionado = Object.assign({}, centro );
  }
  limpiarCentro(): void {
    this.centroSeleccionado = Object.assign({}, centroEstadoInicial );
  }


  getCode(): void {
    let code;
    if (this.count.count < 10) {
      code = 'CS00' + this.count.count.toString();
    } else if ( this.count.count < 100 ) {
      code = 'CS0' + this.count.count.toString();
    } else if ( this.count.count < 1000 ) {
      code = 'CS' + this.count.count.toString();
    }
    this.centroSeleccionado.code = code;
  }

  getCount(): void {
    this.centerService.countCenter()
    .subscribe( count => {
      this.count = JSON.parse(count);
      this.getCode();
    });
  }
  getCountById(): void {
    const body = {id: this.accountId};
    this.centerService.getCountCenterById(body)
    .subscribe( count => {
      this.count = JSON.parse(count);
    });
  }

  // Edicion de los centros de Servicio
  editCenter(center: any): void {
    this.centerService.editCenter(center)
    .subscribe( response  => {
      this.msg('¡Genial!', 'Se han guardado los cambios');
      this.getCenter(this.skip, this.limitSelect);
    }, (err) => {
      this.msg('Ups!', 'Ha ocurrido un error al editar el centro de servicio');
    } );
  }

  // Edicion de la cuenta
  editAccount(account: ICuenta ): void {
    this.accountService.editAccount(account)
    .subscribe( response => {
      this.msg('Genial', 'Los cambios se han guardado con éxito');
      // this.seeEditAccount = !this.seeEditAccount;
      this.getPlan();
    }, (err) => {
      this.msg('Lo sentimos', 'Ocurrio un error al actualizar la cuenta');
    } );
  }

  // Cambiar el Plan de la cuenta
  editPlan(): void {
    this.account.plan = this.planSelect;
    this.editAccount(this.account);
  }

  // Agregar nuevo contacto
  addContact(): void {
    if (this.contact.name && this.contact.position && this.contact.email && this.contact.telephone) {
      this.account.contacts.push(this.contact);
      this.editAccount(this.account);
      this.contact = {
        name: '',
        position: '',
        email: '',
        telephone: '',
        access: true
      };
    } else {
      this.msg('Vamos Amigo', 'Por favor completa todos los datos');
    }

  }

  // Validar nuevo usuario
  newUser(): void {
    this.userService.singUp(this.user)
    .subscribe( user => {
      this.msg('Genial', 'Se ha creado el usuario');
      this.user = Object.assign( {}, usuarioEstadoInicial );
      this.getUserById();
    }, (err) => {
      this.msg('Lo sentimos', 'Ha ocurrido un error: ' + err.error.msg);
    });
  }

  // Crear usuario
  saveUser(): void {
    if (this.user.name && this.user.last_name && this.user.email && this.user.password && this.user.repeat_password) {
      if (this.user.password === this.user.repeat_password) {
        this.user.account[0] = this.accountId;
        this.user.role = this.typeUser;
        // this.user.centers.push(this.center._id)
        this.user.centers = [];
        for (const i of this.centers) {
          if (i.select) {
            this.user.centers.push(i._id);
          }
        }
        this.newUser();

      } else {
        // las contraseñas no coinceden
        this.msg('¡Ups!', 'Las contraseñas no coinciden');
      }
    } else {
      // Por favor completa todos los datos
      this.msg('¡Ups', 'Por favor completa todos los datos');
    }
  }

  // Obtener usuarios
  getUserById(): void {
    this.userService.getUserById(this.accountId)
    .subscribe( users => {
      this.users = JSON.parse(users);
    } );
  }

  // Actualizar usuarios
  updateUser(user: any): void {
    if (user.newPassword && user.confirmPassword && (user.newPassword.length > 2)) {
      if (user.newPassword === user.confirmPassword) {
        user.password = user.newPassword;
      } else {
        return this.msg('¡Ups!', 'Las contraseñas no coinciden');
      }
    }

    this.userService.upDateUser(user)
    .subscribe( update => {
      this.msg('Genial', 'El usuario ha sido actualizado exitosamente');
      for (const i of this.centers) {
        i.select = false;
      }
    }, (err) => {
      this.msg('Lo sentimos', 'Error al actualizar el usuario: ' + err.error.msg);
    });
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

  open(content, userSelect: any) {
    for (const i of this.centers) {
      i.select = false;
    }
    this.userSelect = userSelect;

    for (const i of this.centers) {
      for (const j of userSelect.centers) {
        if (j === i._id) {
          i.select = true;
        }
      }
    }

    this.modalService.open(content, {
      size: 'lg',
      centered: true
    });
  }

  openModal(modal): void {
    this.modalService.open(modal, { size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEditModal(modal, user): void {
    this.userSelect = user;
    this.modalService.open(modal, { size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  saveCenters(user: any) {
    user.centers = [];
    for (const i of this.centers) {
      if (i.select) {
        user.centers.push(i._id);
      }
    }
    this.userService.upDateUser(user)
    .subscribe( update => {
      this.msg('Genial', 'El usuario ha sido actualizado exitosamente');
      for (const i of this.centers) {
        i.select = false;
      }
    }, (err) => {
      this.msg('Lo sentimos', 'Error al actualizar el usuario: ');
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }



  // Funciones de agregar logo
  onFileSelect($event): void {
    console.log($event.target.files[0]);
    this.dataImg.name = $event.target.files[0].name;
    this.dataImg.size = $event.target.files[0].size;
    this.dataImg.type = $event.target.files[0].type;
    if (this.dataImg.type.split('/')[0] !== 'image') {
      return this.msg('Ups!', 'Por favor subo un archivo de tipo imagen: jpg, png, etc.');
    }
    const reader = new FileReader();
    this.progress = 0;
    reader.readAsDataURL($event.target.files[0]);
    reader.onload = ($event) => {
      this.imgPreview = (<FileReader>$event.target).result;
    };
  }


  uploadFiles(): void {
    this.uploader.onBuildItemForm = (FileItem: any, form: any) => {
      form.append('account', this.account.code);
    };
    this.uploader.uploadAll();
    this.uploader.onProgressAll = (progress: any) => {
      this.progress = progress;
    };
    this.uploader.onSuccessItem = (item: any, response: string, status: number, header: any): any => {
      if (response && status === 200) {
        const dataResponse = JSON.parse(response);

        this.account.logo.url = this.domain + 'uploads/' + dataResponse.generatedName; // save PHP
        this.account.logo.name = dataResponse.originalname;
        this.account.logo.type = dataResponse.originalName.split('.', 2)[1];

        this.editAccount(this.account);


      }

    };
  }

  validarDuracionVideo = () => {
    if ( this.account.generales.video.duracion > 60 ) {
      this.account.generales.video.duracion = 60;
    } else if ( this.account.generales.video.duracion < 20 ) {
      this.account.generales.video.duracion = 20;
    }
  }

}
