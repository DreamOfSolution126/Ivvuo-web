import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IUsuario } from '../../interfaces/usuario/usuario';
import { MsgComponent } from '../../msg/msg.component';
import { UrlService } from '../../services/url/url.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  public user: IUsuario = JSON.parse(localStorage.getItem('user'));
  public fechas = {
    id: this.user.centers,
    desde: moment( `${moment().format('YYYY-MM-')}01` ).format('YYYY-MM-DD'),
    hasta: moment( `${moment().format('YYYY-MM-')}01` ).add(1, 'month').subtract(1, 'minute').format('YYYY-MM-DD')
  };
  private api = this.urlService.mBaas;
  private path = 'reportes-excel/';

  constructor(
    private urlService: UrlService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
  }

  reporteDeActividades = () => {
    const parametros = { _arg: this.api };
    parametros._arg += this.path;
    parametros._arg += 'reporteActividadesCentro';
    parametros._arg += `?id=${JSON.stringify(this.fechas.id)}`;
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
