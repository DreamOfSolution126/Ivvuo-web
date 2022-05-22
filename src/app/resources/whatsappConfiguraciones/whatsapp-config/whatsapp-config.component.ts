import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../../services/account/account.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-whatsapp-config',
  templateUrl: './whatsapp-config.component.html',
  styleUrls: ['./whatsapp-config.component.css']
})
export class WhatsappConfigComponent implements OnInit {

  @Input() whatsapp: any;
  @Input() id: string;

  public opcional = {
    estatus: false,
    accountSid: 'AC085e0d74225cfd21081916c53a8957d5',
    authToken: '017c8150c0a3770eef1bd332007281bd',
    numero: '14155238886'
  };

  public edit = {
    accountSid: false,
    authToken: false,
    numero: false
  };

  constructor(
    private accountService: AccountService,
    private modalService: NgbModal
    ) { }

  ngOnInit() {
    // if (!this.whatsapp) {
    //   this.whatsapp = this.opcional;
    // }
  }

  editar() {
    this.accountService.getAccountById(this.id)
    .subscribe( response => {
      const data = JSON.parse( response );
      data.whatsapp = this.whatsapp;
      console.log(data);
      this.accountService.editAccount(data)
      .subscribe( editResponse => {
        this.msg('Operación exitosa', 'Los cambios se han guardado con éxito');
      }, error => {
        this.msg('Error', 'Lo sentimos ocurrió un error al actualizar las configuraciones');
      });
    }, error => {
      this.msg('Error', 'Lo sentimos ocurrió un error al actualizar las configuraciones');
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
