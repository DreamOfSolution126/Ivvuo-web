import { Component, OnInit } from '@angular/core';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService } from '../../../services/account/account.service';
import { PlansService } from '../../../services/plans/plans.service';
import { CountryService } from '../../../services/countrys/country.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {

  account:any ={
    name:'',
    code:'',
    nit:'',
    av:'',
    email:'',
    address:'',
    city:'',
    country:'',
    phone_code:57,
    code_country:'',
    telephone:'',
    contacts:[],
    plan:''
  }
  contact:any={
    name:'',
    position:'',
    email:'',
    telephone:'',
    access:true
  }
  contacts:any=[]

  response:any={}
  count:any={}
  plans:any = []
  planSelect:any='none'
  public countrys = this.countryService.getCountrys();
  constructor( private countryService:CountryService, private modalService:NgbModal, private accountService:AccountService, private planService:PlansService) { }

  ngOnInit() {
    this.getCountAccount()
    this.getPlans();
    
    
  }

  changeCountry():void{
    for(let i of this.countrys){
      if(this.account.country === i.nombre){
        this.account.code_country = i.iso2;
        this.account.phone_code = i.phone_code;
      }
    }
    console.log(this.account)
  }
  

  getPlans():void{
    this.planService.getPlans()
    .subscribe( plans =>{
      this.plans = JSON.parse(plans)
    } )
  }

  saveAccount(){
    if(this.contacts){
      this.account.contacts = this.contacts
    }
    if(this.planSelect){
      this.account.plan = this.planSelect
    } else {
      return this.msg('¡Ups!', 'Por favor elije un plan para la cuenta')
    }
    if(this.account.name && this.account.email && this.account.nit && this.account.address && this.account.city && this.account.country && this.account.telephone){
      if(this.account.telephone.length > 7){



        this.accountService.newAccount(this.account)
        .subscribe( account=>{
          this.response = JSON.parse(account)
          this.msg('Genial!',this.response.msg)
          this.clear()
        } )
      } else {
        this.msg('Información', 'El número de teléfono debe ser al menos de 8 caracteres')
      }
      
    } else {
      this.msg('Información', 'Por favor completa todos los datos, los campos de Código y abreviatura se generarán de forma automática')
    }
    
  }

  //Obtener abreviatura
  getAv (name, city):void{
    if(name && city){
      this.account.av = 'AC '+ city[0]+city[1]+city[2]+' '+name[0]+name[1]
      this.account.av = this.account.av.toUpperCase()
    }
  }
  //Obtener cantidad de cuentas registradas
  getCountAccount():void{
    this.accountService.countAccount()
    .subscribe( count =>{
      this.count = JSON.parse(count)
      this.getCode()
    } )
  }
  //get Code
  getCode():void{
    this.count.msg = this.count.msg + 1
    let code = 'AC';
    if(this.count.msg < 10){
      code ='AC00' + this.count.msg.toString()
    } else if( this.count.msg < 100 ){
      code ='AC0' + this.count.msg.toString()
    } else if( this.count.msg < 1000 ){
      code ='AC' + this.count.msg.toString()
    }
    this.account.code = code
  }
  //Clear
  clear():void{
    this.account ={
      name:'',
      code:'',
      nit:'',
      av:'',
      email:'',
      address:'',
      city:'',
      country:'',
      telephone:''
    }
    this.contacts = []
    this.getCountAccount()
  }

  //Created contacts array
  addContact():void{
    if(this.contact.name && this.contact.position && this.contact.email && this.contact.telephone){
      this.contacts.push(this.contact)
      this.contact={
        name:'',
        position:'',
        email:'',
        telephone:'',
        access:true
      }
    } else {
      this.msg('Vamos Amigo', 'Por favor completa todos los datos')
    }
    
  }

  deletContact(item):void{
    let i = this.contacts.indexOf( item )
    this.contacts.splice(i, 1)
  }

  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
