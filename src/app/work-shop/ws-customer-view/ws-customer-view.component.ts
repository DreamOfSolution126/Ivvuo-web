import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { WorkShopService } from '../../services/workshop/work-shop.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SnackbarService } from 'ngx-snackbar';
import { MsgComponent } from '../../msg/msg.component';

import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ws-customer-view',
  templateUrl: './ws-customer-view.component.html',
  styleUrls: ['./ws-customer-view.component.css'],
  providers: [NgbCarouselConfig]

})
export class WsCustomerViewComponent implements OnInit {

  public params: any;
  public order: any = {};
  public modalInstance: any;
  public itemSelect: any;
  public seeInformation = false;
  public seeRequires = false;
  public totalApproved = 0;
  public inspectionResume: any = { items: 0, ok: 0, warning: 0, danger: 0 };
  public moreInfo: any;
  public showNavigationArrows = true;
  public showNavigationIndicators =  true;
  public priority = [];

  constructor(
    private config: NgbCarouselConfig,
    private titleService: Title,
    private snackbarService: SnackbarService,
    private modalService: NgbModal,
    private workshopService: WorkShopService,
    private activateRoute: ActivatedRoute ) {

    this.config.wrap = true;
    this.config.keyboard = true;
   }

  ngOnInit() {
    this.activateRoute.params
    .subscribe( params => {
      this.params = params;
      this.getOrderById(params);
      this.orderByPriority();
    } );
  }

  abrirEvidencia = ( evidencia: any ) => {
    console.log( 'Evidencia: ', evidencia );
  }

  orderByPriority() {

    this.workshopService.getOrderByIdToCustomer(this.params.id)
    .subscribe( data => {
      this.priority = JSON.parse(data);
    }, error => {
      this.msg('Error', 'Lo sentimos ocurrió un error al obtener el detalle de la orden');
    });
  }

  getOrderById(params): void {
    this.workshopService.getOrderById(params)
    .subscribe( order => {
      this.order = JSON.parse(order);
      this.titleService.setTitle(`${this.order.account} - ${this.order.center }` );
      this.getTotalAprove();
      this.getInspectionResume();

    }, err => {

    });
  }

  openModal(modal, itemSelect): void {
    this.itemSelect = itemSelect;
    // this.userToDelet = user
    this.modalInstance = this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  openQuotationModal(modal): void {
    this.modalInstance = this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  updateOrder(): void {
    this.workshopService.updateOrder(this.order)
    .subscribe( success => {
      this.snackMsg('Se ha enviado su respuesta al centro de servicio');
      this.getOrderById(this.params);
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al actualizar la orden');
    });
  }

  aprovePoint(activity: any, val: boolean): void {
    if (val) {
      activity.resQuotation = {
        status: 'approved',
        date: new Date()
      };
    } else {
      activity.resQuotation = {
        status: 'reject',
        date: new Date()
      };
    }
    this.getTotalAprove();

  }

  getTotalAprove(): void {
    this.totalApproved = 0;
    for (const i of this.order.process) {
      for (const j of i.checkList) {
        if ((j.resQuotation && j.resQuotation.status === 'approved') && !j.resQuotation.block) {
          this.totalApproved += j.total;
        }
      }
    }
  }

  sendApproved(): void {
    this.order.total_approve = 0;
    this.order.parts_approve = 0;
    this.order.mo_approve = 0;

    this.order.mo_ban = 0;
    this.order.parts_ban = 0;
    this.order.total_ban = 0;

    for (const i of this.order.process) {
      for (const j of i.checkList) {
        if (j.resQuotation && j.resQuotation.status === 'approved') {
          this.order.total_approve += j.total;
          this.order.parts_approve += j.parts;
          this.order.mo_approve += j.mo;
        }
        if (!j.resQuotation || j.resQuotation.status !== 'approved') {
          this.order.mo_ban += j.mo;
          this.order.parts_ban += j.parts;
          this.order.total_ban += j.total;
        }
      }
    }
    this.updateOrder();
  }

  getInspectionResume(): void {
    this.inspectionResume = {items: 0, ok: 0, warning: 0, danger: 0};
    for (const i of this.order.process) {
      for (const j of i.checkList) {
        if (j.type === 'inspection') {
          this.inspectionResume.items += 1;
        }
        if (j.type === 'inspection' && j.answer.answer === 'Ok') {
          this.inspectionResume.ok += 1;
        }
        if (j.type === 'inspection' && j.answer.answer === 'Regular') {
          this.inspectionResume.warning += 1;
        }
        if (j.type === 'inspection' && j.answer.answer === 'Urgente') {
          this.inspectionResume.danger += 1;
        }
      }
    }
  }

  setMoreInfo(): void {
    this.order.moreInfo.unshift({
      message: this.moreInfo,
      date: new Date(Date.now()),
      view: false,
      answer: '',
      dateAnswer: ''
    });
    this.order.notify.view = true;
    this.order.notify.pending += 1;
    this.moreInfo = '';
    this.updateOrder();
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

}
