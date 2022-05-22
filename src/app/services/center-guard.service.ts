import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { MsgComponent } from '../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class CenterGuardService {

  private user =  { role:''}

  constructor( public router:Router, public authService: AuthServiceService, private modalService:NgbModal ) { }

  canActivate(): boolean{
    this.user = JSON.parse(localStorage.getItem('user'));
    if(this.authService.isAuthenticated() && (this.user.role === 'service_center')){
      return true
    } else {
      localStorage.clear()

      this.msg('Seguridad','No posees suficientes privilegios para acceder a este centro de servicio.')
      this.router.navigate(['login']);
      return false
    }
  }

  msg(header:string, body:string){
    const modalRef = this.modalService.open(MsgComponent,{
      centered:true,
    });
    modalRef.componentInstance.header = header
    modalRef.componentInstance.body = body
  }

}
