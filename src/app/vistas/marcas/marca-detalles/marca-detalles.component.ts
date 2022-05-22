import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CenterService } from '../../../services/center/center.service';
import { MarcaService } from '../../../services/marca/marca.service';
import { IMarca } from '../../../interfaces/marca/marca';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MsgComponent } from '../../../msg/msg.component';
import { UserService } from '../../../services/user.service';
import { TipoRol } from '../../../enum/tipo-rol.enum';
import { IUsuario, usuarioEstadoInicial,  } from '../../../interfaces/usuario/usuario';
import { CountryService } from '../../../services/countrys/country.service';

@Component({
  selector: 'app-marca-detalles',
  templateUrl: './marca-detalles.component.html',
  styleUrls: ['./marca-detalles.component.css']
})
export class MarcaDetallesComponent implements OnInit {

  public centros: any[];
  public listaCentros: any[];
  public idMarca: string;
  public marca: IMarca;
  public centroSeleccionado: string;
  public centrosParaAgregar: any[] = [];
  public menu = {
    activo: 'centros'
  };
  public usuarios: IUsuario[];
  public usuario: IUsuario;
  public listadoPaises = [];

  @ViewChild('usuarioModal') private modalUsuario: ElementRef;
  constructor(
    private centrosService: CenterService,
    private marcaService: MarcaService,
    private modalService: NgbModal,
    private rutaActiva: ActivatedRoute,
    private usuarioService: UserService,
    private paiseServicio: CountryService
  ) {
    this.usuario = Object.assign({}, usuarioEstadoInicial );
    this.usuario.role = TipoRol.REPRESENTANTE_MARCA;
  }

  ngOnInit() {
    this.consultaPaises();
    this.rutaActiva.params.subscribe( parametros => {
      this.idMarca = parametros.id;
      this.consultaMarca();
      this.consultaUsuarios();
    });
  }

  manejoEventoActualizar = () => {
    this.consultaUsuarios();
  }
  manejaEventoSeleccionarUsuario = ( usuario: IUsuario ) => {
    this.usuario = usuario;
    this.abrirModal( this.modalUsuario );
    console.log( 'Usuario seleccionado: ', usuario );
  }

  abrirModal = ( modal ) => {
    this.modalService.open( modal, {
      centered: true
    });
  }

  actualizar = () => {
    this.marcaService.actualizar( this.marca )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
        this.mensaje('Informacion', data.resultadoOperacion );
        this.consultaMarca();
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion );
    });
  }

  agregar = () => {
    if ( !this.centroSeleccionado ) {
      return;
    }

    let existeCentro = false;
    for (const i of this.marca.centros) {
      if ( this.centroSeleccionado.toString() === i ) {
        existeCentro = true;
      }
    }

    if ( existeCentro ) {
      return;
    }

    this.marca.centros.push( this.centroSeleccionado );
    this.centroSeleccionado = '';
  }

  consultaPaises = () => {
    this.listadoPaises = this.paiseServicio.getCountrys();
  }

  consultaMarca = () => {
    this.marcaService.consultaPorId({ id: this.idMarca })
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.marca = data.data;
        this.consultaListaCentros();
        this.consultaCentros();
      } else {
        this.mensaje('informacion', data.resultadoOperacion );
      }
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion );
    });
  }



  consultaCentros = () => {
    const parametros = { centers: this.marca.centros };
    this.centrosService.obtenerMultiplesCentros(parametros)
    .subscribe( resultado => {
      const data = JSON.parse(resultado);
      this.centros = data;
    }, error => {
      console.log(error );
    });
  }

  consultaListaCentros = () => {
    const parametro = { centros: this.marca.centros };
    this.centrosService.consultaListaCentros( parametro )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      if ( data.estatus ) {
        this.listaCentros = data.data;
      }
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion );
    });
  }

  consultaUsuarios = () => {
    const parametro = { marca: this.idMarca };
    this.usuarioService.obtenerUsuarioPorMarca( parametro )
    .subscribe( resultado => {
      const data = JSON.parse( resultado );
      console.log( 'consultaUsuarios', data )
      this.usuarios = data.data;
    }, error => {
      this.mensaje('Error', error.error.resultadoOperacion);
    });
  }

  eliminar = ( id: string ) => {
    const index = this.marca.centros.indexOf( id );
    this.marca.centros.splice( index, 1 );
    this.actualizar();
  }

  mensaje = ( header: string, body: string) => {
    const instancia = this.modalService.open(MsgComponent, {
      centered: true
    });
    instancia.componentInstance.header = header;
    instancia.componentInstance.body = body;

  }

}
