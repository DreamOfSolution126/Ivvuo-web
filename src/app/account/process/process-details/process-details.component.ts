import {  Component, OnInit  } from '@angular/core';
import {  ActivatedRoute, Params  } from '@angular/router';
import {  NgbModal  } from '@ng-bootstrap/ng-bootstrap';

import {  ProcessService  } from '../../../services/process/process.service';
import {  MsgComponent  } from '../../../msg/msg.component';
import {  ActivityService  } from '../../../services/activity/activity.service';
import {  IconsService  } from '../../../services/icons/icons.service';

import {  IconFilterPipe  } from '../../../pipe/icon-filter.pipe';

import { IActividad, estadoInicialActividad, estadoInicialItemCotizacion } from '../../../interfaces/actividad/actividad';
import { ItemCotizacion } from '../../../interfaces/cotizacion/item-cotizacion';


@Component({
  selector:  'app-process-details',
  templateUrl:  './process-details.component.html',
  styleUrls:  ['./process-details.component.css']
 })
export class ProcessDetailsComponent implements OnInit {

  // public params: any;
  public list:  any = [];
  public newProcess:  any = {
    listId:  '',
    account_code:  '',
    icon:  '',
    iconName:  '',
    process:  '',
    description:  '',
    weight:  '',
    index: 0,
    notifyCustomer: false,
  };
  public newActivity: IActividad;
  public activitySelect: IActividad;
  // public newQuotation: any= {  cant: 0, parts: 0, hours: 0, mo: 0, total_parts: 0, total_mo: 0  }
  public filter: any = {  };
  // data
  public process: any = [];
  public optionAnswerCustom: any;
  public optionStyleCustom: any;
  public optionAnswerValue: number;
  public processSelect: any;
  public activitys: any = [];
  private countDataActivitys = 0;
  public icons: any;
  public iconSelect: string;
  public iconNameSelect: string;
  public iconSearch = { name:  '' };

  public newPartCollapse = true;
  public newMOCollapse = true;

  // Quotation
  // Parts
  public seePartsDetails = false;
  public newPart: any = {
    code: '',
    name: '',
    units: 1,
    valueUnit: '',
    total: 0
  };
  // M.O.
  public seeMODetails = false;
  public newMO: any = {
    routine: '',
    hours: '',
    valueHour: '',
    total: 0
  };

  constructor(
    private iconService: IconsService,
    private activityService: ActivityService,
    private modalService: NgbModal,
    private activeRoute: ActivatedRoute,
    private processService: ProcessService ) {
      this.newActivity = Object.assign( {}, estadoInicialActividad );
      this.activitySelect = Object.assign( {}, estadoInicialActividad );
    }

  ngOnInit() {
    this.icons = this.iconService.getAllIcons();
    this.activeRoute.params.subscribe( (params:  Params) => {
      const body = {  id: params['id']  };
      this.processService.getListById(body)
      .subscribe( list => {
        this.list = JSON.parse(list);
        this.getProcess();
        this.getActivityByList();
       }, err => {
        console.log(err);
       } );
     } );
   }

  getActivityByList(): void {
    const filter = {  listId: this.list._id  };
    this.activityService.getActivityByList(filter)
    .subscribe( activitys => {
      this.activitys = JSON.parse(activitys);
     }, err => {
      this.msg('Lo sentimos', 'Ocurrió un problema al obtener las actividades');
     } );
   }

  editList(): void {
    this.processService.editList(this.list)
    .subscribe( success => {
      this.msg('Genial', 'Se ha actualizado el listado');
      this.ngOnInit();
     }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al actualizar la lista');
     });
   }

  openModal( modal: any): void {
    this.modalService.open( modal, {
      centered: true,
      size: 'lg'
     });
  }

  createProcess(): void {
    this.newProcess.account_code = this.list.account_code;
    this.newProcess.listId = this.list._id;
    this.newProcess.index = this.process.length + 1;
    if (!this.iconSelect) {
      return this.msg('¡Ups!', 'Por favor elige un icono para este proceso');
     }
    this.newProcess.icon = this.iconSelect;
    this.newProcess.iconName = this.iconNameSelect;


    this.processService.createProcess(this.newProcess)
    .subscribe( success => {
      this.newProcess = {
        listId:  '',
        account_code:  '',
        icon:  '',
        iconName:  '',
        process:  '',
        description:  '',
        weight:  '',
        index: 0,
        notifyCustomer: false,
       };
      this.getProcess();
     }, err => {
      this.msg('Error', 'Ocurrió un error al crear el proceso');
     });
   }

  getProcess(): void {
    this.processService.getProcess(this.list)
    .subscribe( process => {
      this.process = JSON.parse(process);
     }, err => {
      console.log('Ocurrió un error al obtener los procesos');
     });
   }

  deletProcess(process: any): void {

    const validacion = window.confirm('Seguro que desea borrar este proceso?, esta acción no puede deshacerse');

    if (!validacion) {
      return;
    }

    this.processService.deletProcess(process)
    .subscribe( success => {
      this.msg('Genial', 'Se ha borrado con exito');
      this.getProcess();
     }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al eliminar el proceso');
     });
   }

  editProcess(process: any): void {
    this.processService.editProcess(process)
    .subscribe( success => {
      this.msg('Genial', 'El proceso se ha editado con exito');
      this.getProcess();
     }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al editar el proceso');

     } );
   }

  setIndexProcess(action: string, index: any): void {
    switch ( action ) {
      case 'up':
        const saveCurrent = this.process[index].index;
        const saveUp = this.process[index - 1].index;
        this.process[index].index = saveUp;
        this.process[index - 1].index = saveCurrent;

        this.processService.editProcess(this.process[index])
        .subscribe( success => {
          this.processService.editProcess(this.process[index - 1])
          .subscribe( respuesta => {

            this.getProcess();

           }, err => {

            this.msg('Lo sentimos', 'Ocurrió un error al editar el proceso');

           } );
         }, err => {
          this.msg('Lo sentimos', 'Ocurrió un error al editar el proceso');
         } );
      break;
      case 'down':
        const saveCurrent2 = this.process[index].index;
        const saveUp2 = this.process[index + 1].index;
        this.process[index].index = saveUp2;
        this.process[index + 1].index = saveCurrent2;

        this.processService.editProcess(this.process[index])
        .subscribe( success => {
          this.processService.editProcess(this.process[index + 1])
          .subscribe( response => {
            this.getProcess();
           }, err => {
            this.msg('Lo sentimos', 'Ocurrió un error al editar el proceso');
           } );
         }, err => {
          this.msg('Lo sentimos', 'Ocurrió un error al editar el proceso');
         } );

      break;
     }
   }

  setAnswerOptions(): void {
    this.newActivity.asnwer_options = [];
    this.activitySelect.asnwer_options = [];
    if ( this.newActivity.type === 'check' || this.activitySelect.type === 'check' ) {
      console.log('Entro a check', this.newActivity );
      this.newActivity.asnwer_options = [];
      this.activitySelect.asnwer_options = [];
      this.newActivity.asnwer_options.push({
        value: 2,
        answer: 'Cumple'
       },
      {
        value: 0,
        answer: 'No cumple'
       },
      {
        value: 99,
        answer: 'N/A'
       });
      this.activitySelect.asnwer_options.push({
        value: 2,
        answer: 'Cumple'
       },
      {
        value: 0,
        answer: 'No cumple'
       },
      {
        value: 99,
        answer: 'N/A'
       });
     } else if (this.newActivity.type === 'inspection' || this.activitySelect.type === 'inspection') {
      this.newActivity.asnwer_options = [];
      this.activitySelect.asnwer_options = [];
      this.newActivity.asnwer_options.push({
        value: 2,
        answer: 'Ok'
       },
      {
        value: 1,
        answer: 'Regular'
       },
      {
        value: 0,
        answer: 'Urgente'
       },
      {
        value: 99,
        answer: 'N/A'
       });
      this.activitySelect.asnwer_options.push({
        value: 2,
        answer: 'Ok'
       },
      {
        value: 1,
        answer: 'Regular'
       },
      {
        value: 0,
        answer: 'Urgente'
       },
      {
        value: 99,
        answer: 'N/A'
       });
     } else if ( this.newActivity.type === 'survey' || this.activitySelect.type === 'survey') {
      this.newActivity.asnwer_options = [];
      this.activitySelect.asnwer_options = [];
      for (let i = 0 ; i < 10; i++ ) {
        this.newActivity.asnwer_options.push({
          value:  this.getValue( i + 1 ),
          answer: `${i + 1}`
         });
        this.activitySelect.asnwer_options.push({
          value: this.getValue(i + 1),
          answer: `${i + 1}`
         });
       }
     } else if ( this.activitySelect.type === 'custom' || this.newActivity.type === 'custom' ) {
      this.activitySelect.asnwer_options = [];
      this.newActivity.asnwer_options = [];
     } else if ( this.activitySelect.type === 'revision' || this.newActivity.type === 'revision') {
      this.activitySelect.asnwer_options = [];
      this.newActivity.asnwer_options = [];
      this.newActivity.asnwer_options.push(
        {
          value: 2,
          answer: 'Buen estado'
        },
        {
          value: 1,
          answer: 'Atención Pronta'
        },
        {
          value: 0,
          answer: 'Cambio Inmediato'
        },
        {
          value: 99,
          answer: 'N/A'
        });

      this.activitySelect.asnwer_options.push(
        {
          value: 2,
          answer: 'Buen estado'
        },
        {
          value: 1,
          answer: 'Atención Pronta'
        },
        {
          value: 0,
          answer: 'Cambio Inmediato'
        },
        {
          value: 99,
          answer: 'N/A'
        });
     }
  }

  getValue( value: number ): number {
    if ( value > 8) { return 2; }
    if ( value > 6 && value < 9) { return 1; }
    if (value < 7) { return 0; }
  }

  addCustomAnswer(): void {
    if ( !this.optionAnswerCustom ) {
      return this.msg('Campo incompleto', 'Por favor agrega un texto al campo de la Visual del Cliente');
     }
    if ( !this.optionStyleCustom) {
      return this.msg('Campo incompleto', 'Por favor elige una prioridad para esta opción de respuesta');
     }
    this.newActivity.asnwer_options.push({
      value: this.optionAnswerValue,
      answer: this.optionAnswerCustom,
      style: this.optionStyleCustom
     });
    if ( this.activitySelect && this.activitySelect.type === 'custom') {
      this.activitySelect.asnwer_options.push({
        value: this.optionAnswerValue,
        answer: this.optionAnswerCustom,
        style: this.optionStyleCustom
       });
     }
    this.optionAnswerCustom = '';
    this.optionStyleCustom = '';
    this.optionAnswerValue = 0;
   }

  createActivity(): void {
    this.newActivity.listId = this.list._id;
    this.newActivity.processId = this.process[this.processSelect]._id;
    this.newActivity.account_code = this.list.account_code;

    this.activityService.createActivity(this.newActivity)
    .subscribe( success => {
      this.msg('Genial', 'Se ha creado la actividad');
      this.newActivity = Object.assign( {}, estadoInicialActividad );
      this.getActivityByList();
     }, err => {

      this.msg('Error', `${ err.error.msg }`);
     });
   }

  editActivity(): void {
    this.activityService.editActivity(this.activitySelect)
    .subscribe( success => {
      this.getActivityByList();
      this.msg('Genial', 'Se ha actualizado la actividad');
     }, err => {
      this.msg('Lo sentimos', 'Ha ocurrido un error al actualizar la actividad');
     });
   }

  deletActivity(activity: any): void {

    const confirmacion = window.confirm('Está seguro que desea borrar esta actividad?, esta acción no puede deshacerse');

    if ( !confirmacion ) { return; }

    this.activityService.deletActivity(activity)
    .subscribe( success => {
      this.msg('Operación exitosa', 'Se ha borrado la actividad');
      this.getActivityByList();
     }, err => {
      this.msg('Lo sentimos', 'Ha ocurrido un error al eliminar la actividad');

     });
   }

  getActivityCountByProcess(): void {
    this.newActivity.listId = this.list._id;
    this.newActivity.processId = this.process[this.processSelect]._id;
    this.newActivity.account_code = this.list.account_code;
    let countData = {  count: 0  };
    this.activityService.getActivityCountByProcess(this.process[this.processSelect])
    .subscribe( count => {
      countData = JSON.parse(count);
      this.newActivity.index =  countData.count;
      this.createActivity();
     }, err => {

      console.log(err);

      this.newActivity.index =  0;
      this.msg('Lo sentimos', 'Ocurrió un error al crear la actividad');

     } );

   }

  setIndexActivity( action:  any, index:  any, indexProces:  any):  void {
    let save, other;
    let a, b;
    b = this.activitys.indexOf(index);

    for (const i of this.activitys) {
      if (i.activities.indexOf(indexProces) !== -1) {
        a = i.activities.indexOf(indexProces);
       }
     }

    switch ( action ) {
      case 'up':
      save = this.activitys[b].activities[a].index;
      other = this.activitys[b].activities[ a - 1 ].index;

      this.activitys[b].activities[a].index = other;
      this.activitys[b].activities[ a - 1 ].index = save;

      this.activityService.editActivity( this.activitys[b].activities[a])
      .subscribe( success => {

        this.activityService.editActivity(this.activitys[b].activities[ a - 1 ])
        .subscribe( respuesta => {

          this.getActivityByList();

         }, err => {
          this.msg('Lo sentimos', 'Ha ocurrido un error al actualizar la actividad');
         });

       }, err => {
        this.msg('Lo sentimos', 'Ha ocurrido un error al actualizar la actividad');
       });

      break;

      case 'down':

      save = this.activitys[b].activities[a].index;
      other = this.activitys[b].activities[ a + 1 ].index;

      this.activitys[b].activities[a].index = other;
      this.activitys[b].activities[ a + 1 ].index = save;

      this.activityService.editActivity( this.activitys[b].activities[a])
      .subscribe( success => {

        this.activityService.editActivity( this.activitys[b].activities[ a + 1 ] )
        .subscribe( (resultado:  any) => {

          this.getActivityByList();

         }, err => {
          this.msg('Lo sentimos', 'Ha ocurrido un error al actualizar la actividad');
         });

       }, err => {
        this.msg('Lo sentimos', 'Ha ocurrido un error al actualizar la actividad');
       });

      break;
     }
   }

  addMOToQuotation = () => {
    this.activitySelect.quotation.mo.push(this.newMO);
    this.newMO = {
      routine: '',
      hours: '',
      valueHour: '',
      total: 0
    };
    this.setMoOnActivitySelect();
  }

  addPartToQuotation = () => {
    this.activitySelect.quotation.parts.push(this.newPart);

    this.newPart = {
      code: '',
      name: '',
      units: 1,
      valueUnit: '',
      total: 0
    };
    this.setPartsOnActivitySelect();
  }

  setTotalNewPart(): void {
    if ((this.newPart.units && this.newPart.valueUnit) && (this.newPart.units > 0)) {
      this.newPart.total = this.newPart.units * this.newPart.valueUnit;
    }
  }

  setTotalNewMO(): void {
    if ((this.newMO.hours && this.newMO.hours > 0) && (this.newMO.valueHour && this.newMO.valueHour > 0)) {
      this.newMO.total = this.newMO.hours * this.newMO.valueHour;
    }
  }

  setMoOnActivitySelect = () => {
    if (this.activitySelect.quotation.mo.length === 0) { return; }

    let total = 0;
    this.activitySelect.quotation.mo.map( (i: any) => {
      total += i.total;
    });

    this.activitySelect.mo = total;

  }

  setPartsOnActivitySelect = () => {
    if (this.activitySelect.quotation.parts.length === 0) { return; }

    let total = 0;
    this.activitySelect.quotation.parts.map( (i: any) => {
      total += i.total;
    });

    this.activitySelect.parts = total;

  }

  deletMOFromQuotation( item: any ): void {
    const index = this.activitySelect.quotation.mo.indexOf(item);
    this.activitySelect.quotation.mo.splice(index, 1);

    if (this.activitySelect.quotation.mo && this.activitySelect.quotation.mo.length >= 0) {
      this.activitySelect.mo = 0;
      for (const i of this.activitySelect.quotation.mo) {
        this.activitySelect.mo += i.total;
      }
    }
  }

  deletPartFromQuotation(item: any ): void {
    const index = this.activitySelect.quotation.parts.indexOf(item);
    this.activitySelect.quotation.parts.splice(index, 1);
    if (this.activitySelect.quotation.parts && this.activitySelect.quotation.parts.length >= 0 ) {
      this.activitySelect.parts = 0;
      for (const i of this.activitySelect.quotation.parts) {
        this.activitySelect.parts +=  i.total;
      }
    }
  }

  agregarCotizacion( actividad: IActividad ) {
    this.activitySelect = actividad;
    this.editActivity();
  }




  msg( header:  string, body:  string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered:  true,
     });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
   }
 }
