import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MsgComponent } from '../../../msg/msg.component';

import { ProcessService } from '../../../services/process/process.service';


@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.css']
})
export class ProcessListComponent implements OnInit {

  private accountData = JSON.parse(localStorage.getItem('accountData'));
  public filter: any = { account_code: ''};
  public lists: any = [];
  public newList: any = {
    lista: '',
    description: '',
    account_code: this.accountData.code,
    advanceVisible: true
  };

  constructor( private processService: ProcessService, private modalService: NgbModal ) {}

  ngOnInit() {
    this.getList();
  }

  openModal(modal): void {
    this.modalService.open(modal, {
      centered: true,
      size: 'lg'
    });
  }

  getList(): void {
    this.filter.account_code = this.accountData.code;
    this.processService.getList(this.filter)
    .subscribe( lists => {
      this.lists = JSON.parse(lists);
    }, err => {
      this.msg('Lo sentimos', 'Ocurrió un error al obtener las listas');
    });
  }

  createList(): void {
    this.processService.createList(this.newList)
    .subscribe( success => {
      this.msg('Genial', `Se ha creado una nueva lista ${this.newList.list}`);
      this.getList();
    }, err => {
      this.msg('Lo sentimos', err.error.msg);
    } );
  }

  deletList(list: any): void {

    const validacionEliminar = window.confirm('Desea eliminar esta lista?, esta acción no se puede deshacer');
    if (!validacionEliminar) {
      return;
    }

    this.processService.deletList(list)
    .subscribe( success => {
      this.getList();
      this.msg('Lista borrada', `La lista ${list.list} ha sido borrada`);
    }, err => {
      this.msg('Lo sentimos', err.error.msg);
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
