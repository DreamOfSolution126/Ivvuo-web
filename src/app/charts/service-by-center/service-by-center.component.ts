import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { ChartService } from '../../services/chart/chart.service';
import { AccountService } from '../../services/account/account.service';
import { Chart } from 'chart.js';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgComponent } from '../../msg/msg.component';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-service-by-center',
  templateUrl: './service-by-center.component.html',
  styleUrls: ['./service-by-center.component.css']
})
export class ServiceByCenterComponent implements OnInit {

  // public accountData = JSON.parse(localStorage.getItem('accountData'))

  public user = JSON.parse(localStorage.getItem('user'));
  public account: any = [];
  public rangeSelect = 'week';
  public statusSelect = 'invoiced';
  public chartCountObject: any;
  public chartValueObject: any;
  public chartTaxObject: any;
  public chartTicketObject: any;
  public chartPartsObject: any;
  private defaultLegendClickHandler = Chart.defaults.global.legend.onClick;
  public chartOptions: any = {

  };
  public data: any = [];
  public viewCharts = {
    aa: false,
    ab: false,
    ba: false,
    bb: false,
    bc: false,
  };

  public params = {
    accountCode: '',
    optionSelect: '',
    status: [],
    centers: []
  };

  constructor(
    private titleService: Title,
    private modalService: NgbModal,
    private chartService: ChartService,
    private accountService: AccountService
    ) {}
  @ViewChild('chartCount') ChartCount: ElementRef;
  @ViewChild('chartValue') ChartValue: ElementRef;
  @ViewChild('chartTax') ChartTax: ElementRef;
  @ViewChild('charGroup') ChartGroup: ElementRef;
  @ViewChild('chartParts') CharParts: ElementRef;

  @Input() accountData;

  ngOnInit() {

    this.getDataAccountById();

  }



  getDataAccountById(): void {
    const body = { id: this.user.account[0]};
    this.accountService.getAccountIdToCenter(body)
    .subscribe( account => {
      this.account = JSON.parse(account);
      localStorage.setItem('accountData', JSON.stringify(this.account));
      this.setParams();
      this.titleService.setTitle(`IVVUO: ${this.account.name}`);
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al obtener los datos, por favor cierre sesión e inicie nuevamente');
    } );
  }

  // Generate Charts
  generateChartCount(): void {
    if (this.chartCountObject ) {
      this.chartCountObject.destroy();
    }
    this.chartCountObject = new Chart(this.ChartCount.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            type: 'line',
            label: 'Promedio',
            data: this.data.avg_orders,
            fill: false,
            backgroundColor: 'lightgreen',
            borderColor: 'lightgreen'
          },
          {
            label: 'Ordenes',
            data: this.data.orders,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
          }
        ]
      },
      options: {}
    });
  }

  generateChartValue(): void {
    if (this.chartValueObject ) {
      this.chartValueObject.destroy();
    }
    this.chartValueObject = new Chart(this.ChartValue.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: 'Cotizado',
            data: this.data.total,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
          },
          {
            label: 'Aprobado',
            data: this.data.total_approve,
            backgroundColor: 'lightgreen',
            borderColor: 'lightgreen',
          },
          {
            label: 'Rechazado',
            data: this.data.total_ban,
            backgroundColor: 'pink',
            borderColor: 'pink',
          }
        ]
      },
      options: this.chartOptions
    });
  }

  generateChartTicket(): void {
    if (this.chartTaxObject ) {
      this.chartTaxObject.destroy();
    }
    this.chartTaxObject = new Chart(this.ChartTax.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: 'Ticket promedio',
            data: this.data.ticket,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
            fill: false,
          }
        ]
      },
      options: this.chartOptions
    });
  }

  generateChartQuotationDetails(): void {
    if (this.chartTicketObject ) {
      this.chartTicketObject.destroy();
    }
    this.chartTicketObject = new Chart(this.ChartGroup.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            // type:'line',
            label: 'Cotizado Partes',
            data: this.data.parts,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
            // fill:false
          },
          {
            // type:'line',
            label: 'Aprobado Partes',
            data: this.data.parts_approve,
            backgroundColor: 'lightgreen',
            borderColor: 'lightgreen',
            // fill:false
          },
          {
            // type:'line',
            label: 'Rechazado Partes',
            data: this.data.parts_ban,
            backgroundColor: 'pink',
            borderColor: 'pink',
            // fill:false
          },

        ]
      },
      options: this.chartOptions
    });
  }

  generateChartParts(): void {
    if (this.chartPartsObject) {
      this.chartPartsObject.destroy();
    }
    this.chartPartsObject = new Chart(this.CharParts.nativeElement, {
      type: 'bar',
      data: {
        labels: this.data.labels,
        datasets: [
          {
            label: 'Cotizado Mano Obra',
            data: this.data.mo,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
          }, {
            label: 'Aprobado Mano de Obra',
            data: this.data.mo_approve,
            backgroundColor: 'lightgreen',
            borderColor: 'lightgreen'
          },
          {
            label: 'Rechazado Mano de Obra',
            data: this.data.mo_ban,
            backgroundColor: 'pink',
            borderColor: 'pink'
          }
        ]
      },
      options: this.chartOptions
    });
  }

  setParams(): void {
    this.params.status = [];
    if (this.statusSelect === 'all') {
      this.params.status = ['process', 'invoiced', 'canceled', 'completed'];
    } else {
      this.params.status.push(this.statusSelect);
    }
    this.params.accountCode = this.account.code;
    this.params.optionSelect = this.rangeSelect;
    this.params.centers = this.user.centers;
    this.workOrdersResume();
  }

  workOrdersResume(): void {
    this.chartService.workOrdersResume(this.params)
    .subscribe( orders => {
      this.data = JSON.parse(orders);
      this.generateChartCount();
      this.generateChartValue();
      this.generateChartTicket();
      this.generateChartQuotationDetails();
      this.generateChartParts();
    }, err => {
      this.msg(
        'Lo sentimos',
        'Ocurrió un error al obtener la información por favor revise su conexión a internet y recargue el sitio o presione F5');
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
