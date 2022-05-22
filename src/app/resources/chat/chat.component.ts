import {
  AfterViewChecked,
  Component,
  OnInit,
  Input,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { WhatsappService } from '../../services/whatsapp/whatsapp.service';
import { MsgComponent } from '../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('contenedorMensajes') private contenedorMensaje: ElementRef;
  @Input() idCuenta: any;
  @Input() para: any;

  public newMensaje: string;
  public whatsappMensajes = [];
  public cargando = false;
  public intervalo;

  constructor(
    private modalService: NgbModal,
    private whatsappService: WhatsappService
  ) { }

  ngOnInit() {
    this.obtener();
    this.ObtenerMensajes();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy () {
    clearInterval( this.intervalo );
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterViewChecked() {
    this.deslizarAbajo();
  }

  deslizarAbajo = () => {
    try {
      this.contenedorMensaje.nativeElement.scrollTop = this.contenedorMensaje.nativeElement.scrollHeight;
    } catch ( error ) {
      console.log('Error: ', error);
    }
  }

  ObtenerMensajes = () => {
    this.intervalo = setInterval( () => {
      this.obtener();
    }, 10000 );
  }


  obtener = () => {

    const para = this.para;
    const accountId = this.idCuenta;

    this.whatsappService.obtener({
      para: para,
      idCuenta: accountId
    }).subscribe( success => {
      const respuesta = JSON.parse( success );
      if (respuesta.data.estatus) {
        this.whatsappMensajes = respuesta.data.mensajes;
      }

    }, error => {
      this.msg('Error', 'Lo sentimos, ocurrió un error al otener los mensajes');
    } );
  }

  send = () => {
    if (!this.newMensaje) {
      return;
    }
    this.whatsappService.enviar({
      idCuenta: this.idCuenta,
      para: this.para,
      mensaje: this.newMensaje
    }).subscribe( response => {
      this.newMensaje = '';
      this.obtener();
    }, error => {
      this.msg('Error', 'Lo sentimos, ocurrió un error al enviar el mensaje');
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
