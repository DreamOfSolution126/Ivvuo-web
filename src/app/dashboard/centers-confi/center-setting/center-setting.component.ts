import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CenterService } from '../../../services/center/center.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-center-setting',
  templateUrl: './center-setting.component.html',
  styleUrls: ['./center-setting.component.css']
})
export class CenterSettingComponent implements OnInit {

  public centertId: any;
  public center: any;
  constructor(
    private activeRoute: ActivatedRoute,
    private centerService: CenterService,
    private modalServicio: NgbModal
    ) { }

  ngOnInit() {

    this.activeRoute.params.subscribe( (params: Params) => {

      this.centertId = params['id'];

      this.centerService.findCenterById(this.centertId)
      .subscribe( center => {

        this.center = JSON.parse(center);

      }, error => {
        this.mensaje('Error', 'Ocurrio un error al obtener las configuraciones');
      });
    } );
  }

  setCenter(): void {

    this.centerService.editCenter(this.center)
    .subscribe( success => {

      this.mensaje('Actualizado', 'Configuraciones actualizadas con exito');

    }, err => {

      this.mensaje('Error', 'Ocurrio un error al actualizar las configuraciones');

    });
  }

  mensaje = ( title: string, body: string) => {
    const modalRef = this.modalServicio.open( MsgComponent, {
      centered: true
    } );
    modalRef.componentInstance.header = title;
    modalRef.componentInstance.body = body;
  }

}
