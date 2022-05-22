import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { Ng2ImgToolsService } from 'ng2-img-tools';
import { Title } from '@angular/platform-browser';
import * as moment from 'moment';


import { WorkShopService } from '../../services/workshop/work-shop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from 'ngx-snackbar';
import { MsgComponent } from '../../msg/msg.component';
import { UrlService } from '../../services/url/url.service';
import { SmsService } from '../../services/sms/sms.service';
import { ProcessService } from '../../services/process/process.service';
import { ListaService } from '../../services/lista/lista.service';
import { WhatsappService } from '../../services/whatsapp/whatsapp.service';
import { UserService } from '../../services/user.service';
import { AccountService } from '../../services/account/account.service';
import { ICuenta } from '../../interfaces/cuenta/cuenta';
import { estadoInicialActividad, IActividad } from '../../interfaces/actividad/actividad';
import { CampanasServicioService } from '../../services/campanas-servicio/campanas-servicio.service';


@Component({
  selector: 'app-ws-order-details',
  templateUrl: './ws-order-details.component.html',
  styleUrls: ['./ws-order-details.component.css']
})
export class WsOrderDetailsComponent implements OnInit {

  // public test = '<i class="fas fa-info-circle fa-2x"></i>';
  public url = this.urlService.host();
  public domain = this.urlService.domain();
  public itemSelect: any;
  public imgSelect: any;
  public user = JSON.parse(localStorage.getItem('user'));
  public order: any = [];
  public progress = 0;
  public procesoSeleccionado: any;
  public editData = true;
  private params: any;
  public newNote: any = { text: '', date: '', user: this.user.email};
  public list: Array<any> = [];
  public listDetails: any;
  public listSelect: any;
  public usuarios = [];

  public newItem: IActividad;
  public newProcess: any = {
    listId: '',
    account_code: '',
    icon: '<i class="fas fa-thumbtack></i>',
    process: '',
    description: '',
    weight: '',
    index: 0,
    notifyCustomer: false,
    checkList: []
  };

  public imgPreview: any;
  public modalInstance: any;
  public uploader: FileUploader = new FileUploader({
    // url: this.url + 'api/workshop/uploadImgProfile'
    url: this.domain + 'upload.php'
  });
  public hSpinner: any = { visible: false, text: ''};
  public newComment: any = { text: '', date: '', user: '' };
  public index: any = {item: '', process: ''};
  public sms: any = {
    number: '',
    header: '',
    body: '',
    account: '',
  };
  public smsTemplate: any;
  public templateSelect: any;

  public whatsappNuevasNotificaciones = 0;
  public cuenta: ICuenta;
  public campanas;
  public filtroLista = {
    ok: false,
    regular: false,
    urgente: false,
    todos: true,
    noAplica: true
  }

  constructor(
    private cuentaService: AccountService,
    private userService: UserService,
    private smsService: SmsService,
    private titleService: Title,
    private imageTools: Ng2ImgToolsService,
    private urlService: UrlService,
    private snackbarService: SnackbarService,
    private modalService: NgbModal,
    private whatsappService: WhatsappService,
    private workshopService: WorkShopService,
    private activateRoute: ActivatedRoute,
    private processService: ProcessService,
    private listaService: ListaService,
    private campanasService: CampanasServicioService
    ) {
      this.newItem = Object.assign( {}, estadoInicialActividad );
    }

  ngOnInit() {
    this.activateRoute.params
    .subscribe( params => {
      this.params = params;
      this.getOrderById(params);
      this.cargarDatosCuenta();
    } );

  }

  verProcesos = ( accion: string ) => {

    if ( accion === 'abrir') {
      for (const i of this.order.process ) {
        i.seeProcess = true;
      }
    }

    if ( accion === 'cerrar') {
      for (const i of this.order.process ) {
        i.seeProcess = false;
      }
    }

    this.updateOrder();
  }

  cargarDatosCuenta = () => {
    this.cuentaService.getAccountById(this.user.account[0])
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      this.cuenta = data;
    }, error => {
      this.msg('Lo sentimos', ' Ocurrio un error al obtener los datos de la cuenta')
    });
  }

  getOrderById( params: any ): void {
    this.workshopService.getOrderById(params)
    .subscribe( order => {
      this.order = JSON.parse(order);
      this.titleService.setTitle(`${this.order.account} - ${this.order.center }`);
      this.getList();
      this.getByAccountSMSTemplate();
      this.obtenerNotificacionesWhatsapp();
      this.obtenerUsuarios();
      this.consultaCampanas();
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al obtener la orden por favor vuelva a intentarlo');
    });
  }

  envioNotificacionOrden = () => {
    if ( !this.cuenta.whatsapp.estatus ) {
      this.msg('Servicio no disponible', 'Su cuenta no tiene este servicio disponible actualmente');
      return;
    }
    this.whatsappService.envioNotificacion( {
      idCuenta: this.order.accountId,
      para: this.order.telephone,
      mensaje: `${
        this.order.account.replace(' ', '-')
      }  le informa los avances de la inspección en el siguiente link ${this.order.shortUrl}`
    } ).subscribe( respuesta => {
      const data = JSON.parse(respuesta).data;
      console.log( 'Respuesta evioNotificacionOrden: ', data );
      if ( data.estatus ) {
        this.order.send_to_customer = true;
        this.order.date_send = moment().format();
        this.updateOrder();
        this.msg('Notificación enviada', `Se ha enviado un whatsapp al: ${this.order.telephone}`);
      }
    }, error => {
      this.msg('Lo sentimos', 'Ocurrió un error al enviar el Whatsapp, por favor intentelo nuevamente');
    } );
  }
  obtenerOrden = () => {
    this.getOrderById( this.params );
  }

  obtenerNotificacionesWhatsapp = () => {
    const payload = {
      idCuenta: this.order.accountId,
      telefonoCliente: this.order.telephone
    };

    this.workshopService.obtenerNotificacionesWhastapp( payload )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus) {
        this.whatsappNuevasNotificaciones = data.data;
      }

    }, error => {
      this.msg('Error', 'Error al obtener las notificaciones de whatsapp');
    });
  }

  getList(): void {
    const params = { account_code: this.order.account_code };
    this.processService.getList(params)
    .subscribe( list => {
      this.list = JSON.parse(list);
      if (this.list && this.list.length > 0) {

        this.listSelect = this.list[0]._id;
        this.listDetails = this.list[0];
      }
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al obtener las listas');
    } );
  }

  seleccionarListado(): void {
    this.listaService.IncluirListadoOrden({
      idOrden: this.order._id,
      idLista: this.listSelect
    })
    .subscribe( success => {
      this.snackMsg('Se ha asignado una lista');
      this.getOrderById(this.params);
    }, err => {
      this.msg('Lo sentimos', `Ocurrió un error al asignar el listado ${err.error}` );
    });
  }

  getByAccountSMSTemplate(): void {
    const body = { code: this.order.account_code };
    this.smsService.getByAccountSMSTemplate(body)
    .subscribe( smsTemplate => {
      this.smsTemplate = JSON.parse(smsTemplate);
      for (const i of this.smsTemplate) {
        if (i.default) {
          this.templateSelect = i.name;
          if ( i.sms_header === 'bothNames') {
            this.sms.body = this.order.account + ' ' + this.order.center + ' ';
          } else if (i.sms_header === 'nameCenter') {
            this.sms.body = this.order.center + ' ';
          } else if (i.sms_header === 'nameAccount') {
            this.sms.body = this.order.account + ' ';
          }
          this.sms.body = this.sms.body + ' ' + i.sms_body;
          if ( i.sms_link ) {
            this.sms.body = this.sms.body + ' ' + this.order.shortUrl + ' ';
          }
        }
      }
    }, err => {
      this.msg('Error al obtener los SMS', 'Ocurrió un error al obtener las plantillas de los SMS');
    });
  }

  setTemplateSMS(): void {
    this.sms.body = '';
    for ( const i of this.smsTemplate) {
      if (this.templateSelect === i.name) {
        if (i.sms_header === 'bothNames') {
          this.sms.body = this.order.account + ' ' + this.order.center + ' ';
        } else if (i.sms_header === 'nameCenter') {
          this.sms.body = this.order.center + ' ';
        } else if (i.sms_header === 'nameAccount') {
          this.sms.body = this.order.account + ' ';
        }
        this.sms.body = this.sms.body + ' ' + i.sms_body;
        if (i.sms_link) {
          this.sms.body = this.sms.body + ' ' + this.order.shortUrl;
        }

      }
    }
  }

  insertLink() {
    this.sms.body = this.sms.body + ' ' + this.order.shortUrl;
  }

  updateOrder = () => {

    if ( !this.order.modoPresentacion.prioridad && !this.order.modoPresentacion.procesos ) {
      this.order.modoPresentacion.prioridad =  true;
    }
    this.setProcessStatus();
    this.workshopService.updateOrder(this.order)
    .subscribe( success => {
      this.snackMsg('Orden actualizada');
      this.getOrderById(this.params);
      this.newComment = { text: '', date: '', user: '' };
    }, err => {
      this.getOrderById(this.params);
      this.msg('Lo sentimos', 'Ocurrió un error al actualizar la orden: ' + JSON.stringify(err.error.msg));
    });
  }

  addNote(): void {
    this.order.notes.unshift({
      text: this.newNote.text,
      date: moment().format(),
      user: this.user.email
    });

    if (!this.order.process[0].key) {
      this.order.process.unshift({
        key: true,
        id: 'customProcess',
        listid: this.order.list._id,
        account_code: this.order.list.account_code,
        icon: '<i class="fas fa-thumbtack"></i>',
        name: 'Diagnóstico',
        description: 'Solicitudes del cliente',
        weight: 100,
        index: 0,
        notifyCustomer: true,
        advanceValue: 0,
        checkList: []
      });
    }

    this.order.process[0].checkList.push({
      item: this.newNote.text,
      id: new Date().toString(),
      details: 'Solicitud del cliente',
      asnwer_options: [
        {
          value: 2,
          answer: 'Ok'
        },
        {
          value: 1,
          answer: 'Regular'
        },
        {
          value: 0,
          answer: 'Urgente'
        },
        {
          value: 99,
          answer: 'N/A'
        }
      ],
      answer: [],
      attach: [],
      comments: [],
      parts: 0,
      mo: 0,
      total: 0,
      approved: '',
      listId: '',
      processId: 'customProcess',
      account_code: '',
      weight: 100,
      type: 'inspection',
      quotation: { parts: [], mo: [] },
      resQuotation: [],
      cotizacion: [],
      seeCustomer: true,
      index: 0
    });


    this.updateOrder();

    this.newNote.text = '';
  }

  onFileSelect($event: any, item: any, process: any): void {

    this.hSpinner.visible = true;
    this.hSpinner.text = 'Procesando';
    const reader = new FileReader();
    this.progress = 0;
    reader.readAsDataURL($event.target.files[0]);

    // tslint:disable-next-line: no-shadowed-variable
    reader.onload = ($event) => {
      this.imgPreview = (<FileReader>$event.target).result;
    };

    if ($event.target.files[0].type.split('/')[0] === 'image') {
      this.hSpinner.text = 'Optimizando Imagen';
      this.imageTools.resizeImage( $event.target.files[0], 800, 800, true)
      .subscribe( result => {
        const newImage = new File( [result], result.name, result );
        this.uploader.clearQueue();
        this.uploader.addToQueue([newImage]);
        this.uploadFiles(item, process);

      }, err => {
        this.hSpinner.visible = false;
        this.msg('Lo sentimos', 'Ocurrió un error al procesar la imagen');
      } );

    } else {
      this.hSpinner.visible = false;
      this.msg('Lo sentimos', 'Actualmente solo formatos de Imagen son permitidos');
    }

  }

  onFileSelectFactura = async ($event: any): Promise<void> => {

    if ($event) {
      this.hSpinner.visible = true;
      this.hSpinner.text = 'Procesando';
      const reader = new FileReader();
      this.progress = 0;
    }

    if ( $event.target.files && $event.target.files.length < 1) {
      this.hSpinner.visible = false;
      this.msg('No se eligio', 'No se eligio ningun archivo');
      return;
    }

    if ( $event.target.files[0].type.split('/')[1] !== 'pdf' ) {
      this.hSpinner.visible = false;
      this.msg('Lo sentimos', 'Sólo formato PDF es aceptado');
      return;
    }

    try {

      this.uploader.onBuildItemForm = ( item: FileItem, form: any) => {
        form.append('item', this.order._id );
      };

      const a = this.uploader.uploadAll();

      this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any => {

        const dataResponse = JSON.parse(response);
        console.log('Respuesta: ', dataResponse );
        console.log('Estatus: ', status );
        this.hSpinner.visible = false;
        this.order.factura = {
          url: this.domain + 'uploads/' + dataResponse.generatedName, // save PHP
          // url: this.domain + 'attach/' + dataResponse.generatedName, // save ExpressJS
          type: dataResponse.originalName.split('.', 2)[1],
          name: dataResponse.originalName,
          date: new Date( Date.now() )
        };

        this.updateOrder();
      };

    } catch ( error ) {
      this.msg('Lo sentimos', 'Ocurrió un error al cargar el archivo');
      this.hSpinner.visible = false;
    }

  }

  setProcessStatus(): void {
    for (const i of this.order.process) {
      let validation = true;
      for (const j of i.checkList) {

        if (!j.answer.answer || !j.answer.value) {
          validation = false;
        }
      }
      if (validation) {
        i.advanceValue = 100;
      }
    }
  }

  uploadFiles(item: any, process: any): void {
    const indexProcess = this.order.process.indexOf(process);
    const indexItem = this.order.process[indexProcess].checkList.indexOf(item);
    this.uploader.onBuildItemForm = (FileItem: any, form: any) => {
      form.append('item', item.item.toLowerCase());
    };
    this.uploader.uploadAll();
    this.uploader.onProgressAll = (progress: any) => {
      this.progress = progress;
    };
    // tslint:disable-next-line: no-shadowed-variable
    this.uploader.onSuccessItem = (item: any, response: string, status: number, header: any): any => {

      if (response && status === 200) {
        const dataResponse = JSON.parse(response);
        this.order.process[indexProcess].checkList[indexItem].attach.push({
          url: this.domain + 'uploads/' + dataResponse.generatedName, // save PHP
          // url: this.domain + 'attach/' + dataResponse.generatedName, // save ExpressJS
          type: dataResponse.originalName.split('.', 2)[1],
          name: dataResponse.originalName,
          date: Date.now()

        });
        this.hSpinner.visible = false;
        this.hSpinner.text = 'Procesando';
        this.updateOrder();
      } else {
        this.hSpinner.visible = false;
        this.hSpinner.text = 'Procesando';
        this.msg('Error', 'Ocurrió un error al cargar el archivo');
      }

    };
  }

  openModal(modal: any): void {
    this.modalInstance = this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  openCommentModal(modal: any, item: any): void {
    this.itemSelect = item.comments;
    this.modalInstance = this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  openAttachModal(modal: any, item: any): void {
    this.imgSelect = [];
    this.itemSelect = item;
    if (this.itemSelect.attach[0]) {
      this.imgSelect = this.itemSelect.attach[0];
    }
    this.modalInstance = this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  abrirModalCotizacion(modal, item, proceso): void {
    this.itemSelect = item;
    this.procesoSeleccionado = proceso;

    this.modalInstance = this.modalService.open( modal, {
      centered: true,
      size: 'lg'
    });
  }

  sendEmail(): void {
    this.workshopService.sendEmail(this.order)
    .subscribe( success => {
      this.order.send_to_customer = true;
      this.order.date_send = moment().format();
      this.order.process[0].seeProcess = false;
      this.updateOrder();
      this.msg('Comunicación', 'Se ha enviado la comunicación al cliente');
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al enviar el email, por favor revise su conexión con internet');
    });
  }

  sendSMS(): void {
    this.sms.number = this.order.telephone.toString();
    this.sms.link = this.order.shortUrl;
    this.sms.account = this.order.account_code;
    this.smsService.sendSMS(this.sms)
    .subscribe( success => {
      this.order.send_to_customer = true;
      this.order.date_send = moment().format();
      this.updateOrder();
      this.msg('SMS enviado', 'Se ha enviado un mensaje de texto al: ' + this.sms.number);
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al enviar el SMS, por favor intentelo nuevamente');
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

  prepareComment(item, process): void {
    this.index.process = this.order.process.indexOf(process);
    this.index.item = this.order.process[this.index.process].checkList.indexOf(item);


  }

  addComment(): void {
    if ( this.newComment.text) {
      this.newComment.user = this.user.email;
      this.newComment.date = new Date();
      this.order.process[this.index.process].checkList[this.index.item].comments.unshift({
        text: this.newComment.text,
        date: this.newComment.date,
        user: this.newComment.user,
      });
      this.updateOrder();
    } else {
      this.msg('Lo sentimos', 'Por favor escribe un comentario');
    }
  }

  deletComment(comment): void {
    const index = this.order.process[this.index.process].checkList[this.index.item].comments.indexOf(comment);
    this.order.process[this.index.process].checkList[this.index.item].comments.splice(
      index, 1
    );
    this.updateOrder();
  }

  obtenerUsuarios () {
    const parametros = { idCentro: this.order.centerId };
    this.userService.obtenerUsuariosPorCentro( parametros )
    .subscribe( respuesta => {
      const data = JSON.parse(respuesta).data;
      if ( data.estatus ) {
        this.usuarios = data.usuarios;
      }
    }, error => {
      this.msg('Error', 'Ocurrio un error al obtener los usuarios');
    } );
  }

  agregarAsignadoAProceso = (asignado: any, process: any): void => {

    if (!asignado.name || !asignado.last_name) { return; }
    const primerNombre = asignado.name.split(' ')[0];
    const primerApellido = asignado.last_name.split(' ')[0];
    const nombresAux = primerNombre + ' ' + primerApellido;
    const emailAux = asignado.email;
    const idAux = asignado._id;
    const indexProceso = this.order.process.indexOf( process );

    if (!this.order.process[indexProceso].asignado) {
      this.order.process[indexProceso].asignado = [];
    }

    const yaExisteAsignacion = this.order.process[indexProceso].asignado.find( i => {
      if (i.id === idAux) {
        return i;
      }
    });

    if (yaExisteAsignacion) {
      return;
    }

    this.order.process[indexProceso].asignado.push({
      nombres: nombresAux,
      email: emailAux,
      id: idAux
    });

  }

  asignarTodaLaOrden = (asignado: any): void => {

    this.order.process.map( i => {

      this.agregarAsignadoAProceso(asignado, i);
    } );
  }

  eliminarAsignacion = (asignado: any, process: any): void => {

    const idAux = asignado._id;
    const indexProceso = this.order.process.indexOf( process );
    const indexAsignacion = this.order.process[indexProceso].asignado.indexOf(asignado);
    if ( indexAsignacion === -1 ) { return; }
    this.order.process[indexProceso].asignado.splice( indexAsignacion, 1 );
    this.updateOrder();
  }

  consultaCampanas = () => {
    this.campanasService.consultaCampanas({ vin: this.order.vin })
    .subscribe( respuesta => {

      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.campanas = data.data.campanas;
      }

    }, error => {
      console.log('Error consultaCampanas', error );
    });
  }

  seleccionarImagenVistaPrevia = (evidencia) => {
    this.imgSelect = evidencia;
  }
}





