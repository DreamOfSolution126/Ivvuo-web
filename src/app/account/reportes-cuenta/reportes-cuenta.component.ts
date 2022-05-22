import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MsgComponent } from '../../msg/msg.component';
import { ReporteService } from '../../services/reportes/reporte.service';
import { UrlService } from '../../services/url/url.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-reportes-cuenta',
  templateUrl: './reportes-cuenta.component.html',
  styleUrls: ['./reportes-cuenta.component.css']
})
export class ReportesCuentaComponent implements OnInit {

  public user = JSON.parse(localStorage.getItem('user'));
  public fechas = {
    id: this.user.account[0],
    desde: moment( `${moment().format('YYYY-MM-')}01` ).format('YYYY-MM-DD'),
    hasta: moment( `${moment().format('YYYY-MM-')}01` ).add(1, 'month').subtract(1, 'minute').format('YYYY-MM-DD')
  };
  private api = this.urlService.mBaas;
  private path = 'reportes-excel/';
  constructor(
    private reporteService: ReporteService,
    private urlService: UrlService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {

  }

  reporteDeActividades = () => {
    const parametros = { _arg: this.api };
    parametros._arg += this.path;
    parametros._arg += 'reporteActvidades';
    parametros._arg += `?id=${this.fechas.id}`;
    parametros._arg += `&desde=${this.fechas.desde}`;
    parametros._arg += `&hasta=${this.fechas.hasta}`;

    window.open( parametros._arg );
    this.msg('Descargando reporte', 'El reporte se descargara de forma automática.')
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
