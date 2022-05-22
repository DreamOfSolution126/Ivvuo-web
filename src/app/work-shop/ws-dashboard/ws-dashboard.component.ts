import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WorkShopService } from '../../services/workshop/work-shop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from 'ngx-snackbar';
import { MsgComponent } from '../../msg/msg.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { CenterService } from '../../services/center/center.service';
import { ProcessService } from '../../services/process/process.service';
import { UrlService } from '../../services/url/url.service';
import { UserService } from '../../services/user.service';

import * as moment from 'moment';


@Component({
  selector: 'app-ws-dashboard',
  templateUrl: './ws-dashboard.component.html',
  styleUrls: ['./ws-dashboard.component.css']
})
export class WsDashboardComponent implements OnInit, OnDestroy {

  public user = JSON.parse(localStorage.getItem('user'));
  public accountData = {
    logoNavBar: '',
    name: '',
    _id: '',
    code: '',
    nit: '',
    logo: {},
    telephone: '',
    address: '',
    city: '',
    country: '',
    whatsapp: { estatus: false }
  };
  public centerData = {generateOrAuto: '', name: '', _id: '', code: '', address_center: '' };
  public orders: any = [];
  public order: any = {
    or: '',
    create: '',
    name: '',
    last_name: '',
    kiolometers: '',
    nit: '',
    email: '',
    telephone: '',

    creadoBy: {
      nombres: '',
      email: '',
      id: ''
    },
    // Datos del vehículo
    plate: '',
    model: '',
    brand: '',
    year: '',
    vin: '',

    accountId: '',
    centerId: '',

    center_code: '',
    account_code: '',
    address_center: '',

    account: '',
    center: '',

    nit_account: '',
    logo: {},
    address_account: '',
    city_account: '',
    country_account: '',
    telephone_account: '',
    generateOrAuto: '',
    list: {}

  };
  public centroSeleccionado: any;
  public filter: any = {
    vin: '',
    or: '',
    plate: '',
    limit: 10,
    skip: 0,
    center_code: '',
    dateInit: moment().subtract( 7, 'days').format('YYYY-MM-DD'),
    dateEnd: moment().format('YYYY-MM-DD'),
    idUsuario: ''
  };
  public currentPage = 1;
  public count: any = { count: 0 };
  public modalInstance: any;
  public list: any = [];
  public listSelect: any;
  public listDetails: any = {description: ''};
  public itemSelect: any;
  private intervalo;
  public usuarios = [];
  public usuarioSelect = 'Todos';
  public subscripcionActiveRoute;
  constructor(
    private routeService: Router,
    private urlService: UrlService,
    private processService: ProcessService,
    private titleService: Title,
    private centerService: CenterService,
    private accountService: AccountService,
    private snackbarService: SnackbarService,
    private modalService: NgbModal,
    private workshopService: WorkShopService,
    private activateRoute: ActivatedRoute,
    private usuarioService: UserService ) { }

  ngOnInit() {

    this.getAccountData();

    this.subscripcionActiveRoute = this.activateRoute.params.subscribe( data => {
      this.centroSeleccionado = data.id.toString();
      clearInterval( this.intervalo );
      this.getCenterData();
    });
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {
    clearInterval( this.intervalo );
    this.subscripcionActiveRoute.unsubscribe();
  }

  setListSelect(): void {
    for ( const i of this.list) {
      if (i._id === this.listSelect ) {
        this.listDetails = i;
        this.order.list = i;
      }
    }
  }

  getAccountData(): void {
    const params = { id: this.user.account[0] };
    this.accountService.getAccountIdToCenter(params)
    .subscribe( account => {
      this.accountData = JSON.parse(account);
      this.getList();
    }, err => {
      this.msg(
        'Lo sentimos',
        'Ocurrió un error al obtener los datos de cuenta, por favor cierre sesión e incie nuevamente');
    } );
  }

  getList(): void {
    const params = { account_code: this.accountData.code };
    this.processService.getList(params)
    .subscribe( (list: any ) => {
      this.list = JSON.parse(list);
      if ( this.list && this.list.length > 0 ) {
        this.listSelect = this.list[0]._id;
        this.listDetails = this.list[0];
        this.order.list = this.list[0];
      }
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al obtener las listas');
    } );
  }

  getCenterData(): void {
    const params = { id: this.centroSeleccionado };
    this.centerService.getDataCenterToId(params)
    .subscribe( center => {
      this.centerData = JSON.parse(center);
      this.filter.center_code = this.centerData.code;
      this.urlService.setCenterSelect( this.centerData );
      this.obtenerUsuariosPorCentro();

      this.setFilters();

      this.titleService.setTitle(`${this.accountData.name} - ${this.centerData.name}` );
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al obtener los datos del taller, por favor cierre sesión e incie nuevamente');
    });
  }

  newOrder(): void {
    this.order.accountId = this.accountData._id;
    this.order.centerId = this.centerData._id;
    this.order.center_code = this.centerData.code;
    this.order.create = new Date( Date.now() );
    this.order.account_code = this.accountData.code;
    this.order.address_center = this.centerData.address_center;
    this.order.account = this.accountData.name;
    this.order.center = this.centerData.name;
    if (!this.user) {
      const validacion = window.confirm('Ocurrió un problema al cargar los datos de usuario');

      if (validacion) {
        window.location.reload();
      }
    }
    this.order.creadoBy.nombres = this.user.name + ' ' + this.user.last_name;
    this.order.creadoBy.email = this.user.email;
    this.order.creadoBy.id = this.user._id;

    this.order.nit_account = this.accountData.nit;
    this.order.logo = { url: this.accountData.logoNavBar};
    this.order.address_account = this.accountData.address;
    this.order.city_account = this.accountData.city;
    this.order.country_account = this.accountData.country;
    this.order.generateOrAuto = this.centerData.generateOrAuto;
    this.order.telephone_account = this.accountData.telephone;

    if ( !this.centerData.generateOrAuto) {
      if ( this.order.id) {
        this.order.id = this.order.id.toUpperCase();
        if ( this.order.plate && this.order.plate.length >= 6 ) {
          this.workshopService.newOrder(this.order)
          .subscribe( success => {
            this.snackMsg('Se ha creado una nueva Orden');
            this.order = {
              or: '',
              name: '',
              last_name: '',
              nit: '',
              email: '',
              telephone: '',
              plate: '',
              model: '',
              brand: '',
              year: '',

              creadoBy: {
                nombres: '',
                email: '',
                id: ''
              },
              accountId: '',
              centerId: '',

              center_code: '',
              account_code: '',
              address_center: '',

              account: '',
              center: '',
              list: {},
              nit_account: '',
              logo: {},
              address_account: '',
              city_account: '',
              country_account: '',
              telephone_account: '',
              generateOrAuto: '',
            };
            this.order.list = this.list[0];
            this.obtenerOrdenes();
          }, err => {
            this.msg('Lo sentimos', 'Ocurrió un error al crear la orden');
          } );
        } else {
          this.msg('Completa el formulario', 'El número de placa debe contener 6 caracteres');
        }
      } else {
        this.msg('Completar OT #', 'Por favor completa el número de orden');
      }
    } else {
      if (this.order.plate && this.order.plate.length >= 6) {
        this.workshopService.newOrder(this.order)
        .subscribe( success => {
          this.snackMsg('Se ha creado una nueva Orden');
          this.order = {
            or: '',
            name: '',
            last_name: '',
            nit: '',
            email: '',
            telephone: '',
            plate: '',
            model: '',
            brand: '',
            year: '',

            creadoBy: {
              nombres: '',
              email: '',
              id: ''
            },

            accountId: '',
            centerId: '',

            center_code: '',
            account_code: '',
            address_center: '',

            account: '',
            center: '',

            nit_account: '',
            logo: {},
            address_account: '',
            city_account: '',
            country_account: '',
            telephone_account: '',
            generateOrAuto: '',
            list: {},
          };
          this.order.list = this.list[0];
          this.obtenerOrdenes();
        }, err => {
          this.msg('Lo sentimos', 'Ocurrió un error al crear la orden');
        } );
      } else {
        this.msg('Completa el formulario', 'aún no sabemos el numero de placa');
      }
    }

  }

  obtenerOrdenes = async () => {

    this.workshopService.obtenerOrdenesTableroControl(this.filter)
      .subscribe( response => {
        const data = JSON.parse(response);
        if (data.estatus) {
          this.orders = data.data;
          this.obtenerNotificacionesWhatsapp();
          this.getCountOrders();
          this.snackMsg('Listado actualizado');
        }
      }, err => {
        
        clearInterval( this.intervalo );

        this.msg(
          'Lo sentimos',
          'No se pudo obtener las ordenes, por favor intente nuevamente.'
          );
        
      } );
  }

  getCountOrders(): void {
    this.workshopService.countOrders(this.filter)
    .subscribe( count => {
      this.count = JSON.parse(count);
    }, err => {
      // console.log('')
    });
  }

  obtenerNotificacionesWhatsapp = () => {
    if ( !this.accountData.whatsapp.estatus ) {
      return;
    };
    this.orders.map( ( i: any ) => {
      this.workshopService.obtenerNotificacionesWhastapp( i.whatsapp )
      .subscribe( respuesta => {
        const data = JSON.parse( respuesta );
        if ( data.estatus) {
          i.whatsapp.mensajesNuevos = data.data;
        } else {
          i.whatsapp.mensajesNuevos = '?';
        }
      }, error => {
        return this.msg('Error', 'Ocurrió un error al obtener las notificaciones de whatsapp');
      });
    } );
  }

  // // // Chage Password Modal
  openModal(modal: any): void {
    this.modalInstance = this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }


  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }


  snackMsg(text: string): void {
    this.snackbarService.add({
      msg: text,
      timeout: 3000,
      action: {
        text: 'OK',
        onClick: (snack) => {
          this.clearSnack();
        }
      }
    });
  }
  clearSnack() {
    this.snackbarService.clear();
  }

  actualizarParametros = () => {
    this.routeService.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        skip: this.filter.skip,
        limit: this.filter.limit,
        pagina: this.currentPage,
        plate: this.filter.plate,
        center_code: this.filter.center_code,
        dateInit: this.filter.dateInit,
        dateEnd: this.filter.dateEnd,
        idUsuario: this.filter.idUsuario,
        vin: this.filter.vin,
        or: this.filter.or,
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).then( () => {
      this.setFilters();
    } );
  }

  updateData( direccion: number ): void {
    this.currentPage += direccion;

    if( this.currentPage <= 0) {
      this.currentPage = 1;
      return;
    }

    this.filter.skip = (this.currentPage - 1) * this.filter.limit;
    this.routeService.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        skip: this.filter.skip,
        limit: this.filter.limit,
        pagina: this.currentPage,
        plate: this.filter.plate,
        center_code: this.filter.center_code,
        dateInit: this.filter.dateInit,
        dateEnd: this.filter.dateEnd,
        idUsuario: this.filter.idUsuario
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).then( () => {
      this.setFilters();
    } );
  }

  setFilters() {

    this.activateRoute.queryParams.subscribe( (parametros) => {
      if ( parametros.skip ) {
        this.filter.skip = parseInt( parametros.skip );
      }

      if ( parametros.limit ) {
        this.filter.limit = parseInt( parametros.limit );
      }

      if ( parametros.pagina ) {
        this.currentPage = parseInt( parametros.pagina );
      }

      if ( parametros.plate ) {
        this.filter.plate = parametros.plate;
      }

      if ( parametros.center_code ) {
        this.filter.center_code = parametros.center_code;
      }

      if ( parametros.dateInit ) {
        this.filter.dateInit = parametros.dateInit;
      }

      if ( parametros.dateEnd ) {
        this.filter.dateEnd = parametros.dateEnd;
      }

      if ( parametros.idUsuario ) {
        this.filter.idUsuario = parametros.idUsuario;
      }

      if (parametros.vin) {
        this.filter.vin = parametros.vin;
      }

      if (parametros.or) {
        this.filter.or = parametros.or;
      }

      if (this.filter.plate) {
        this.filter.plate = this.filter.plate.toUpperCase();
      }
      this.filter.center_code  = this.centerData.code;
      this.filter.idUsuario = this.usuarioSelect;
      this.obtenerOrdenes();

      clearInterval( this.intervalo );

      this.intervalo = setInterval( (err) => {

        if (this.centroSeleccionado) {
          this.obtenerOrdenes();
        }
      }, 120000);

    }).unsubscribe();

  }

  resetFilters() {
    this.filter = {
      plate: '',
      limit: 10,
      skip: 0,
      center_code: '',
      dateInit: moment().subtract( 7, 'days').format('YYYY-MM-DD'),
      dateEnd: moment().format('YYYY-MM-DD'),
      idUsuario: ''
    };
    this.currentPage = 1;

    this.routeService.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: {
        skip: this.filter.skip,
        limit: this.filter.limit,
        pagina: this.currentPage,
        plate: this.filter.plate,
        center_code: this.filter.center_code,
        dateInit: this.filter.dateInit,
        dateEnd: this.filter.dateEnd,
        idUsuario: this.filter.idUsuario
      },
      queryParamsHandling: 'merge',
      skipLocationChange: false
    }).then( () => {
      this.setFilters();
    });
  }

  toggleNotifyPopover(popover, moreInfo: object): void {

    if (popover.isOpen()) {
      popover.close();
    } else {
      popover.open({moreInfo});
    }
  }

  obtenerUsuariosPorCentro() {
    const parametros = { idCentro: this.centerData._id };
    this.usuarioService.obtenerUsuariosPorCentro( parametros)
    .subscribe( respuesta => {
      const data = JSON.parse(respuesta).data;
      if ( data.estatus ) {
        this.usuarios = data.usuarios;
      }
    }, error => {
      this.msg('Error', 'Ocurrio un error al obtener los usuarios');
    });
  }

}
