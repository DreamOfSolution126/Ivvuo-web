import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor( public activeModal: NgbActiveModal ) { }

  @Input() header: string;
  @Input() body: string;
  @Input() rechazar: string;
  @Input() confirmar: string;

  ngOnInit() {
  }

}
