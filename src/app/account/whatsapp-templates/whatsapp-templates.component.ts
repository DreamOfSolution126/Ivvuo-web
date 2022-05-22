import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MsgComponent } from '../../msg/msg.component';
import { WhatsappService } from '../../services/whatsapp/whatsapp.service';

@Component({
  selector: 'app-whatsapp-templates',
  templateUrl: './whatsapp-templates.component.html',
  styleUrls: ['./whatsapp-templates.component.css']
})
export class WhatsappTemplatesComponent implements OnInit {

  public plantilla = {
    _id: '',
    account: '',
    nombre: '',
    cuerpo: '',
    encabezado: '',
    default: false
  };
  public link = ' [LinkInspeccion] ';
  public encabezadoSeleccionado = '';
  public accountData = JSON.parse( localStorage.getItem('accountData') );
  public plantillas = [];
  constructor(
    private modalService: NgbModal,
    private whatsappService: WhatsappService
  ) { }

  ngOnInit() {
    this.obtenerPlantillas();
  }

  selectPlantilla( plantilla: any ) {
    this.plantilla = plantilla;
  }

  openModal( modal: any ): void {
    this.modalService.open( modal, {
      centered: true,
      size: 'lg'
    });
  }

  insertarLink = () => {
    this.plantilla.cuerpo += this.link;
  }

  crearPlantilla = () => {
    const { nombre, cuerpo } = this.plantilla;
    if (!nombre || !cuerpo) {
      return this.msg('Completa formulario', 'Completa el formulario');
    }
    this.plantilla.account = this.accountData._id;

    this.whatsappService.crear( this.plantilla)
    .subscribe( success => {
      const result = JSON.parse( success );
      if ( !result.data.estatus ) {
        this.msg('Error', result.data.resultadoOperacion );
      }
      this.plantilla = {
        _id: '',
        account: '',
        nombre: '',
        cuerpo: '',
        encabezado: '',
        default: false
      };
      this.obtenerPlantillas();
    }, error => {
      console.log(error);
      this.msg('Error', 'error al crear la plantilla');
    });

  }

  obtenerPlantillas = () => {
    const payload = { account: this.accountData._id};
    this.whatsappService.lista( payload )
    .subscribe( success => {
      const data = JSON.parse( success);
      if ( data.data.estatus) {
        this.plantillas = data.data.plantillas;
      }
    }, error => {
      this.msg('Error', 'Error al obtener las plantillas');
    });
  }

  editarPlantilla = (plantilla: any) => {
    this.whatsappService.editar( plantilla )
    .subscribe( success => {

      this.obtenerPlantillas();
    }, error => {
      this.obtenerPlantillas();
    });
  }

  eliminarPlantilla = ( plantilla: any ) => {

    const validacion = window.confirm('Está seguro que sea eliminar esta plantilla?, esta acción no puede deshacerse');
    if ( !validacion ) {
      return;
    }
    this.whatsappService.eliminar( plantilla )
    .subscribe( success => {
      const result = JSON.parse( success );
      if ( !result.data.estatus ) {
        this.msg('Error', result.data.resultadoOperacion );
      }
      this.obtenerPlantillas();
    }, error => {
      this.msg('Error', 'Error al eliminar la plantilla');
      this.obtenerPlantillas();
    });
  }

  cambiarPredefinido = ( plantilla: any ) => {
    let contador = 0;
    this.plantillas.map( (item, index) => {
      item.default = false;
      this.editarPlantilla(item);
      contador += 1;

      if ( contador === this.plantillas.length) {
        plantilla.default = true;
        this.editarPlantilla( plantilla );
      }
    } );
  }

  seleccionarEncabezado = () => {
    switch ( this.encabezadoSeleccionado ) {
      case 'solo_centro':
        this.plantilla.encabezado = '[solo_centro] ';
        break;
      case 'cuenta_centro':
        this.plantilla.encabezado = '[cuenta_centro] ';
        break;
      case 'solo_cuenta':
        this.plantilla.encabezado = '[solo_cuenta] ';
        break;
      case 'ninguno':
        this.plantilla.encabezado = '[ninguno] ';
        break;
    }
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
