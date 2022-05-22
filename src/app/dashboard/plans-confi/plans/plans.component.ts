import { Component, OnInit } from '@angular/core';
import { PlansService } from '../../../services/plans/plans.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  plan:any={
    plan:'',
    value:98000,
    off:0,
    total:98000,
    frequency:30,
    description:''
  }
  plans:any = []
  respose:any = {}
  constructor( private planService:PlansService, private modalService:NgbModal) { }

  ngOnInit() {
    this.getPlans()
  }

  //Total Calculated
  totalSet():void{
    if(this.plan.value && this.plan.frequency){
      let valueDay = this.plan.value / 30
      let valueTotal = valueDay * this.plan.frequency
      this.plan.total = valueTotal - (valueTotal * this.plan.off / 100)
    }
  }

  //Guardar Plan
  newPlan():void{

    if(this.plan.value && this.plan.frequency && this.plan.plan){
      this.planService.newPlan(this.plan)
      .subscribe( plan =>{
        this.msg('Genial', 'El plan se ha creado con exito')
        this.respose = JSON.parse( plan)
        this.clear()
        this.getPlans()
      } )
    } else {
      this.msg('¡Ups!', 'Debes completar todos los campos, cada uno de ellos genera un cálculo de otra forma no se generará el plan')
    }
  }

  // Get Plans
  getPlans():void{
    this.planService.getPlans()
    .subscribe( plans =>{
      this.plans = JSON.parse(plans)
    } )
  }

  //Delet Plans
  deletPlan(id:any):void{
    let plans = { _id:id }
    this.planService.deletPlans(plans)
    .subscribe( plans =>{
      this.msg('Información', 'Se ha borrado con éxito')
      this.getPlans()
    } )
  }

  //Clean Vars
  clear():void{
    this.plan = {
      plan:'',
      value:98000,
      off:0,
      total:98000,
      frequency:30,
      description:''
    }
  }


  //Generar Mensajes

  msg(header:string, body:string):void{
    const modalRef = this.modalService.open( MsgComponent,{
      centered:true,
    } )
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
