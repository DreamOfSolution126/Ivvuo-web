import { Component, OnInit } from '@angular/core';
import { CenterService } from '../../../services/center/center.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.css']
})
export class CenterListComponent implements OnInit {

  filter: any = {
    active: [true, false]
  };
  centers: any = [];
  constructor(private centerService: CenterService, private router: Router) { }

  ngOnInit() {
    this.getCenters();
  }

  getCenters(): void {
    this.centerService.getCenters(this.filter)
    .subscribe( center => {
      this.centers = JSON.parse(center);
    });
  }

  info(center: any): void {
    const id = center._id;
    this.router.navigateByUrl('/dashboard/centersConfi/centerDetails/' + id);
    // this.router.navigateByUrl('/dashboard/accountConfi/accountDetails/' + id);
  }


}
