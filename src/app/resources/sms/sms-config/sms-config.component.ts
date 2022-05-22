import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MsgComponent } from '../../../msg/msg.component';
import { SmsService } from '../../../services/sms/sms.service';

@Component({
  selector: 'app-sms-config',
  templateUrl: './sms-config.component.html',
  styleUrls: ['./sms-config.component.css']
})
export class SmsConfigComponent implements OnInit {

  public newSMS: any = {
    name: '',
    api: '',
    default: false,
    cliente: '',
    account_code: '',
    header: '',
    body: '',
    link: false
  };
  public headerSelect: any = 'nameAccount';
  public smsTemplates: any = [];
  private accountData = JSON.parse( localStorage.getItem('accountData') );
  constructor( private smsService: SmsService, private modalService: NgbModal ) { }

  ngOnInit() {
    this.getByAccountSMSTemplate();
  }

  openModal(modal) {
    this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  createSMSTemplate(): void {
    this.newSMS.account_code = this.accountData.code;
    if (this.headerSelect !== 'custom') {
      this.newSMS.header = this.headerSelect;
    }
    this.smsService.createSMSTemplate(this.newSMS)
    .subscribe( success => {
      this.msg('Genial', 'La plantilla se ha creado con exito');

      this.getByAccountSMSTemplate();
    }, err => {
      this.msg('Lo sentimos ', 'Ocurrió un error al crear esta plantilla');
    });
  }

  getByAccountSMSTemplate(): void {
    this.smsService.getByAccountSMSTemplate(this.accountData)
    .subscribe( sms_templates => {
      this.smsTemplates = JSON.parse(sms_templates);
    }, err => {
      this.msg('Lo sentimos ', 'Ocurrió un error al obtener las plantillas');
      window.alert(err);
    } );
  }

  deletSMSTemplate(sms: any): void {

    const validacion = window.confirm('Seguro desea eliminar esta plantilla?, esta acción no se puede deshacer');

    if ( !validacion ) {
      return;
    }
    this.smsService.deletSMSTemplate(sms)
    .subscribe( success => {
      this.getByAccountSMSTemplate();
    }, err => {
      this.msg('Lo sentimos ', 'Ocurrió un error al eliminar esta plantilla');
      window.alert(JSON.parse(err));

    } );
  }

  setDefault(template, value): void {
    const index = this.smsTemplates.indexOf(template);
    for (const i of this.smsTemplates) {
      i.default = false;
    }
    this.smsTemplates[index].default = value;
    this.smsService.updateSMSTemplate(this.smsTemplates)
      .subscribe( success => {

        this.smsService.updateOneSMSTemplate(this.smsTemplates[index])
        .subscribe( result => {
          this.getByAccountSMSTemplate();
        }, err => {
          this.msg('Lo sentimos ', 'Ocurrió un error al actualizar las plantillas');
        });
      }, err => {
        this.msg('Lo sentimos ', 'Ocurrió un error al actualizar las plantillas');
        window.alert(err);
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
