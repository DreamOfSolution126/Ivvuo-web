import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CenterService } from '../../../services/center/center.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-center-details',
  templateUrl: './center-details.component.html',
  styleUrls: ['./center-details.component.css']
})
export class CenterDetailsComponent implements OnInit {

  public account = JSON.parse(localStorage.getItem('accountData'));
  public centertId: any;
  public center: any = [];
  public viewCenterSetting = false;
  public viewMemberInfo = false;
  public viewServices = false;
  public verApiKey = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private centerService: CenterService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.activeRoute.params.subscribe( (params: Params) => {
      this.centertId = params['id'];
      this.centerService.findCenterById(this.centertId)
      .subscribe( center => {
        this.center = JSON.parse(center);
      });
    } );
  }

  msg(header: string, body: string) {
    const modalRef = this.modalService.open(MsgComponent, {
      centered: true,
    });
    modalRef.componentInstance.header = header;
    modalRef.componentInstance.body = body;
  }

}
