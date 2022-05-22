import { Component, OnInit } from '@angular/core';
import { ICliente, IEditar, IObtener, clienteEstadoInicial} from '../../../interfaces/cliente/cliente';
import { ILista } from '../../../interfaces/listas';
import { listaTiposIdentificacion } from '../../../listas/items-tipos-identificacion';
import { ClientesService } from '../../../services/cliente/clientes.service';
import { ActivatedRoute } from '@angular/router';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoIdentificacion } from '../../../enum/tipo-identificacion.enum';
import * as moment from 'moment';


@Component({
  selector: 'app-formulario-cliente',
  templateUrl: './formulario-cliente.component.html',
  styleUrls: ['./formulario-cliente.component.css']
})
export class FormularioClienteComponent implements OnInit {

  public cliente: ICliente;
  public usuario = JSON.parse(localStorage.getItem('user'));
  public cuenta = this.usuario.account[0];
  public listaTipoIdentificacion: Array<ILista>;
  public listadoDireccionPrincipal: ILista[];
  public identificacionCliente: string;
  public activarEdicion = false;

  constructor(
    private clienteService: ClientesService,
    private activaRuta: ActivatedRoute,
    private modalServicio: NgbModal
    ) {
    this.cliente = Object.assign({}, clienteEstadoInicial );
    this.listaTipoIdentificacion = listaTiposIdentificacion;
    this.cliente.cuenta = this.cuenta;
  }

  ngOnInit() {
    this.activaRuta.params.subscribe( params => {
      this.identificacionCliente = params.id;
      this.cliente.identificacion.numero = this.identificacionCliente;
      this.obtenerCliente();
    });
  }

  crearCliente = () => {
    this.cliente = Object.assign({}, clienteEstadoInicial );
    this.cliente.cuenta = this.cuenta;
    this.cliente.identificacion.tipo = TipoIdentificacion.NIT;
    this.cliente.identificacion.numero = this.identificacionCliente;
    this.clienteService.crear( this.cliente )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.cliente = data.cliente;
      }
    }, error => {
      console.log( error );
      this.mensaje('Error', 'Error al crear el cliente');
    });

  }

  obtenerCliente = () => {

    this.cliente = Object.assign({}, clienteEstadoInicial );
    const parametros: IObtener = {
      identificacion: this.identificacionCliente,
      cuenta: this.cuenta
    };

    this.clienteService.obtener( parametros )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.cliente = data.data;
      } else {
        this.crearCliente();
      }
    }, error => {
      this.mensaje('Error', 'Ocurrio un error al obtener la informacion del cliente');
    });
  }

  editarCliente = () => {
    const parametros: IEditar = {
      data: this.cliente,
      id: this.cliente._id
    };

    this.clienteService.editar( parametros )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.mensaje('Actualizado', 'Cliente actualizado con exito');
        this.activarEdicion = false;
        this.obtenerCliente();
      }
    }, error => {
      this.mensaje('Error', 'Ocurrio un error al actualizar la informacion del cliente');
      this.obtenerCliente();
    } );
  }

  mensaje = (header: string, body: string) => {
    const modalInstancia = this.modalServicio.open( MsgComponent, {
      size: 'lg',
      centered: true
    });
    modalInstancia.componentInstance.header = header;
    modalInstancia.componentInstance.body = body;

  }

}
