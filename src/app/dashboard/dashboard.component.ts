import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  modalChangePass: any;
  closeResult: string;

  pass: any = {
    response: '',
    newPassword: '',
    confirmPassword: ''
  };
  alert: any = {
    type: '',
    msg: ''
  };
  public isCollapsed = true;
  public user = JSON.parse(localStorage.getItem('user'));

  constructor( private router: Router, private modalService: NgbModal, private userService: UserService ) { }
  @ViewChild('chagePassTemplate') chagePassTemplate: ElementRef;

  ngOnInit() {
  }


  goTo(url: string): void {
    this.router.navigateByUrl(url);
  }

  signOut() {
    const validacion = window.confirm('Desea cerrar sesión?');

    if ( !validacion ) { return; }

    localStorage.clear();
    this.goTo('/');
  }

  // Chage Passwrod Function
  change(): void {
    const user = {
      password: this.pass.newPassword,
      _id: this.user._id,
      newPassword: this.pass.newPassword,
      confirmPassword: this.pass.newPassword,
    };
    if (this.pass.newPassword === this.pass.confirmPassword) {
      this.userService.upDateUser(user)
      .subscribe( change => {
        this.pass.response = JSON.parse(change);
        this.alert.type = 'info';
        this.alert.msg = this.pass.response.msg;

      });
    } else {
      this.alert.type = 'warning';
      this.alert.msg = 'Lo sentimos, las contraseñas no coinciden';
    }
  }

  closeAlert(): void {
    this.alert = [];
  }


  // Chage Password Modal
  changePassworOn(): void {

    this.modalChangePass = this.modalService.open(this.chagePassTemplate, {
      centered: true
    });
    this.modalChangePass.result.then((result) => {
      this.closeResult = `Close with ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if ( reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking backdrop click';
    } else {
      return `whith; ${reason}`;
    }
  }

}
