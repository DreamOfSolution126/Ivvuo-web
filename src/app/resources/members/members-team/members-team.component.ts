import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; 
import { FileUploader } from 'ng2-file-upload';

import { CenterService } from '../../../services/center/center.service';
import { MsgComponent } from '../../../msg/msg.component';
import { TeamService } from '../../../services/team/team.service';
import { UrlService } from '../../../services/url/url.service';

@Component({
  selector: 'app-members-team',
  templateUrl: './members-team.component.html',
  styleUrls: ['./members-team.component.css']
})
export class MembersTeamComponent implements OnInit {

  public centertId:any;
  public url = this.urlService.host()
  public account = JSON.parse(localStorage.getItem('accountData'));
  public center:any=[];
  public members:any=[];
  public progress:number = 0;
  public modalInstance:any;
  public memberSelect:any;
  public newMemberTeam:any={
    nit:'',
    role: 'Operario de lavado',
    name: '',
    last_name: '',
    center_code: '',
    account_code: this.account.code,
    profile_picture:{
      url:'',
      name:'',
      type:''
    }
  }
  public imgPreview:any='http://localhost:3001/profiles/default.png';
  public typeUser:any='CENTER_SERVICE';
  uploader:FileUploader = new FileUploader({
    url:this.url+'api/team/uploadImgProfile'
  })
  constructor(private urlService:UrlService, private modalService:NgbModal, private teamService:TeamService, private activeRoute:ActivatedRoute, private centerService:CenterService ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( (params: Params)=>{
      this.centertId = params['id']
      this.centerService.findCenterById(this.centertId)
      .subscribe( center =>{
        this.center = JSON.parse(center)
        this.newMemberTeam.center_code = this.center.code;
        this.getMemberTeamByCenter()
      })
      
    } )
  }


  membervalidator(member):boolean{
    if(member.nit){
      if(member.role){
        if(member.name && member.last_name){
          if(member.center_code && member.account_code){
            return true;
          } else {
            this.msg('Algo salió mal', 'parece que algo salió mal, por favor cierra sesión e ingresa nuevamente, esto debería solucionar el problema')
            return false
          }
        } else {
          this.msg('Formulario incompleto', 'Por favor completa el nombre y el apellido')
          return false
        }
      } else {
        this.msg('Formulario incompleto', 'debes elegir un Rol para el miembro del equipo')
        return false
      }
    } else {
      this.msg('Formulario incompleto', 'Por favor completa el NIT o Cédula de ciudadania')
      return false
    }
  }
  createMemberTeam():void{
    if(this.membervalidator(this.newMemberTeam)){
      this.teamService.newMemberTeam(this.newMemberTeam)
      .subscribe( success=>{
        this.imgPreview = 'http://localhost:3001/profiles/default.png';
        this.msg('Genial', 'El miembro del equipo de ha agregado con éxito')
        this.getMemberTeamByCenter()
        this.newMemberTeam={
          nit:'',
          role: 'Operario de lavado',
          name: '',
          last_name: '',
          center_code: this.center.code,
          account_code: this.account.code
        }
      }, err=>{
        this.msg('Lo sentimos', 'Ocurrió un error al crear el nuevo miebro del equipo')
      })
    }
  }
  getMemberTeamByCenter():void{
    let filter = {center_code:this.center.code, account_code:this.account.code}
    this.teamService.getMemberTeamByCenter(filter)
    .subscribe( members=>{
      this.members = JSON.parse(members)
    }, err=>{
      this.msg('Lo sentimos', 'Ocurrió un error al obtener los miembros del equipo')
    })
  }
  saveMemberTeam(member:any):void{
    if(this.membervalidator(member)){
      this.teamService.saveMemberTeam(member)
      .subscribe( success=>{
        this.msg('Genial', 'El miembro del equipo se ha actualizado con éxito')
        member.edit = false;
      }, err=>{
        this.msg('Lo sentimos', 'Ocurrió un error al actualizar el miembro del equipo')
      })
    }
  }

  onFileSelect($event):void{
    let reader = new FileReader();
    this.progress = 0;
    reader.readAsDataURL($event.target.files[0])
    reader.onload = ($event)=>{
      this.imgPreview = (<FileReader>$event.target).result
    }
  }
  editOnFileSelect($event):void{
    let reader = new FileReader();
    this.progress = 0;
    this.imgPreview='http://localhost:3001/profiles/default.png';
    reader.readAsDataURL($event.target.files[0])
    reader.onload = ($event)=>{
      this.imgPreview = (<FileReader>$event.target).result
    }
    this.editFiles()
  }

  uploadFiles():void{
    this.uploader.onBuildItemForm = (FileItem:any, form:any)=>{
      form.append('nit', this.newMemberTeam.nit)
      form.append('center_code', this.newMemberTeam.center_code)
      form.append('account_code', this.newMemberTeam.account_code)
    }
    this.uploader.uploadAll()
    this.uploader.onProgressAll = (progress:any)=>{
      this.progress = progress;
    }
    this.uploader.onSuccessItem = (item:any, response:string, status:number, header:any):any=>{
      if(response && status == 200){
        let dataResponse = JSON.parse(response)
        this.newMemberTeam.profile_picture.url = this.url + 'profiles/'+this.newMemberTeam.account_code+'/'+dataResponse.filename;
        this.newMemberTeam.profile_picture.name = dataResponse.originalname;
        this.newMemberTeam.profile_picture.type = dataResponse.filename.split('.',2)[1];
        this.createMemberTeam()
      }
    }
  }

  editFiles():void{
    this.uploader.onBuildItemForm = (FileItem:any, form:any)=>{
      form.append('nit', this.memberSelect.nit)
      form.append('center_code', this.memberSelect.center_code)
      form.append('account_code', this.memberSelect.account_code)
    }
    this.uploader.uploadAll()
    this.uploader.onProgressAll = (progress:any)=>{
      this.progress = progress;
    }
    this.uploader.onSuccessItem = (item:any, response:string, status:number, header:any):any=>{
      if(response && status == 200){
        this.deletFiles(this.memberSelect.profile_picture)
        let dataResponse = JSON.parse(response)
        this.memberSelect.profile_picture.url = this.url + 'profiles/'+this.memberSelect.account_code+'/'+dataResponse.filename;
        this.memberSelect.profile_picture.name = dataResponse.originalname;
        this.memberSelect.profile_picture.type = dataResponse.filename.split('.',2)[1];
        this.saveMemberTeam(this.memberSelect)
      }
    }
  }

  deletFiles(file:any):void{
    let fileData = {
      url:file.url,
      server:this.url
    }
    console.log(file)
    this.teamService.deletFiles(fileData)
    .subscribe( success=>{

    }, err=>{
      this.msg('Lo sentimos', 'Ocurrió un error al eliminar el archivo')
    })
  }

  openNewMemberModal(modal): void{
    this.progress = 0;
    this.modalInstance = this.modalService.open(modal, {
      centered:true,
      size:'lg'
    })
  }

  openEditMemberModal(modal, member):void{
    this.progress = 0;
    this.memberSelect = member;
    this.progress = 0;
    this.modalInstance = this.modalService.open(modal, {
      centered:true,
      size:'lg'
    })
  }




  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
