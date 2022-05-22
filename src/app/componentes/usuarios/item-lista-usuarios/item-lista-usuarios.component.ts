import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IUsuario } from '../../../interfaces/usuario/usuario';

@Component({
  selector: 'app-item-lista-usuarios',
  templateUrl: './item-lista-usuarios.component.html',
  styleUrls: ['./item-lista-usuarios.component.css']
})
export class ItemListaUsuariosComponent implements OnInit {

  @Input() usuarios: IUsuario[];
  @Output() usuarioSeleccionado = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  seleccionarUsuario = ( usuario: any ) => {
    this.usuarioSeleccionado.emit( usuario );
  }

}
