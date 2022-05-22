import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../../services/center/center.service';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-center-account-list',
  templateUrl: './center-account-list.component.html',
  styleUrls: ['./center-account-list.component.css']
})
export class CenterAccountListComponent implements OnInit {

  centers:any=[]
  //pagination
  page:any=1
  skip:any=0
  limitSelect:any=20
  count:any=[]
  constructor(private centerService:CenterService, private router:Router) { }

  public user = JSON.parse(localStorage.getItem('user'));
  ngOnInit() {
    this.getCenters(this.skip, this.limitSelect)
    this.getCount()
  }

  getCenters(skip:any, limit:any):void{
    let body = {id:this.user.account[0], skip:skip, limit:limit}
    this.centerService.getCenterById(body)
    .subscribe( centers =>{
      this.centers = JSON.parse(centers)
    })
  }
  getCount():void{
    let body = {id:this.user.account[0]}
    this.centerService.getCountCenterById(body)
    .subscribe( count =>{
      this.count = JSON.parse(count)
    })
  }

  getDataPage():void{
    this.skip = (this.page - 1) * this.limitSelect
    this.getCenters(this.skip, this.limitSelect)
  }

  goTo(center:any, context:string):void{
    let id = center._id
    if(context == 'service'){
      this.router.navigateByUrl('/account_manager/center/assignService/'+id)
    }
  }
  info(center:any):void{
    let id = center._id
    this.router.navigateByUrl('/account_manager/center/centerDetails/'+id)
  }
}
