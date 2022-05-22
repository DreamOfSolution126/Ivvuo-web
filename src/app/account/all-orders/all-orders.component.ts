import { Component, OnInit } from '@angular/core';
import { ChartService } from '../../services/chart/chart.service';
import { AccountService } from '../../services/account/account.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgComponent } from '../../msg/msg.component';
import { OrderReportsService } from '../../services/orderReports/order-reports.service';
import { CenterService } from '../../services/center/center.service';
import * as moment from 'moment';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  public  cargando = false;
  public filter: any = {
    account: [],
    centers: [],
    dateInit: '',
    dateEnd: ''
  };
  public orders: any = [];
  public account: any = [];
  public user = JSON.parse(localStorage.getItem('user'));

  public centers: any = [];
  private body = {};

  // Filters
  public centerSelect: any = 'all';
  public dateInit: any = {
      year: parseInt(moment().format('YYYY')),
      month: parseInt(moment().format('MM')),
      day: 1
  };
  public dateEnd: any = {
    year: parseInt(moment().format('YYYY')),
    month: parseInt(moment().format('MM')),
    day: parseInt( 
      moment(
        moment( '1/' + moment().format('MM/YYYY'), 'DD/MM/YYYY' )
        .format('DD/MM/YYYY'), 'DD/MM/YYYY').add(1, 'month').subtract(1, 'day').format('DD'))
};

  constructor( private centerService: CenterService, private modalService: NgbModal, private orderReportService: OrderReportsService, private accountService: AccountService) { }

  ngOnInit() {
    // this.setFilter()
    this.cargando = true;
    this.body = { id: this.user.account[0], skip: 0, limit: 9999};
    this.accountService.getAccountIdToCenter(this.body)
    .subscribe( account => {
      this.getCenterById();
      this.account = JSON.parse(account);
      localStorage.setItem('accountData', JSON.stringify(this.account));
      // this.setParams()
      this.cargando = false;

    }, err => {
      this.cargando = false;
      this.msg('Lo sentimos', 'Ocurrió un error al obtener los datos, por favor cierre sesión e inicie nuevamente');
    } );
  }

  getCenterById(): void{
    this.cargando = true;
    this.centerService.getCenterById(this.body)
    .subscribe( centers => {
      this.centers = JSON.parse(centers);

      this.setFilter();
      this.cargando = false;
    }, err => {
      this.cargando = false;
      this.msg('Lo sentimos', 'Ocurrió un error al obtener los centros de servicio');
    } );
  }

  getOrders(): void {
    this.cargando = true;
    this.orderReportService.getOrders(this.filter)
    .subscribe( orders => {
      this.cargando = false;
      this.orders = JSON.parse(orders);
    } );
  }

  setFilter(){
    this.filter.account = this.user.account;
    this.filter.centers = [];
    this.filter.dateInit = '';
    this.filter.dateEnd = '';
    this.filter.dateInit = moment(this.dateInit.day.toString() + '/' + this.dateInit.month.toString() + '/' + this.dateInit.year.toString(), 'DD/MM/YYYY').format();
    this.filter.dateEnd = moment(this.dateEnd.day.toString() + '/' + this.dateEnd.month.toString() + '/' + this.dateEnd.year.toString(), 'DD/MM/YYYY').format();

    if (this.centerSelect === 'all'){
      for (const i of this.centers){
        this.filter.centers.push(i.code);
      }
    } else {
      for (const i of this.centers){
        if (this.centerSelect === i.code){
          this.filter.centers.push(i.code);
        }
      }
    }
    this.getOrders();
  }

  dateSelect(): void{
    console.log('ok');
  }

  msg(header: string, body: string){
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

  // Obtener las ordenes

}
