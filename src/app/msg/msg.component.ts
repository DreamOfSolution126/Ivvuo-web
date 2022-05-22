import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-msg',
  templateUrl: './msg.component.html',
  styleUrls: ['./msg.component.css']
})
export class MsgComponent implements OnInit {

  @Input() header: string;
  @Input() body: string;

  constructor( public activeModal: NgbActiveModal ) { }

  ngOnInit() {
  }

}
