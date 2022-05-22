import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { listaTiposIdentificacion } from '../../../listas/items-tipos-identificacion';
import { listaCategoriaLicencia } from '../../../listas/items-categoria-licencia';
import { listaRoles } from '../../../listas/item-tipo-rol';
import { ILista } from '../../../interfaces/listas';
import { IUsuario } from '../../../interfaces/usuario/usuario';
import { UserService } from '../../../services/user.service';
import { MsgComponent } from '../../../msg/msg.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploader, FileItem, ParsedResponseHeaders } from 'ng2-file-upload';
import { UrlService } from '../../../services/url/url.service';
import { PrecargaComponent } from '../../../componentes/utilitarios/precarga/precarga.component';
import { TipoRol } from '../../../enum/tipo-rol.enum';

@Component({
  selector: 'app-formulario-usuarios',
  templateUrl: './formulario-usuarios.component.html',
  styleUrls: ['./formulario-usuarios.component.css']
})
export class FormularioUsuariosComponent implements OnInit {

  @Input() marca: string;
  @Input() usuario: IUsuario;
  @Output() cerrarModal = new EventEmitter<string>();
  @Output() actualizar = new EventEmitter<string> ();

  public user = JSON.parse( localStorage.getItem('user') );
  public cargandoImagen = false;
  public tiposIdentificacion: ILista[];
  public tipoCategoriaLicencia: ILista[];
  public tipoRoles: ILista[];
  public domain = this.urlService.domain();
  public imagenPerfil = {
    nombre: '',
    tamano: '',
    tipo: ''
  };
  public vistaPrevia: ArrayBuffer | string;
  public uploader: FileUploader = new FileUploader({
    // url: this.url + 'api/workshop/uploadImgProfile'
    url: this.domain + 'upload.php'
  });
  public confirmarContrasena: string;

  constructor(
    private usuarioService: UserService,
    private modalService: NgbModal,
    private urlService: UrlService,
  ) {
    this.tiposIdentificacion = listaTiposIdentificacion;
    this.tipoCategoriaLicencia = listaCategoriaLicencia;
    this.tipoRoles = listaRoles;
  }

  ngOnInit() {
    if ( this.marca ) {
      this.usuario.marca = this.marca;
    }
  }

  actualizarEvento = () => {
    this.actualizar.emit();
  }

  actualizarUsuario = () => {
    this.usuarioService.upDateUser( this.usuario )
    .subscribe( respuesta => {
      const data = JSON.parse( respuesta );
      this.mensaje('Informacion', data.msg );
      this.cargandoImagen = false;
      console.log( data );
    }, error => {
      this.mensaje('Error', 'Lo sentimos ocurrio un error al actualizar el usuario' );
    } );
  }

  cerrar = () => {
    this.cerrarModal.emit('cerrar');
  }

  mensaje = ( header: string, body: string ) => {
    const instancia = this.modalService.open( MsgComponent, {
      centered: true
    });
    instancia.componentInstance.header = header;
    instancia.componentInstance.body = body;
  }

  cambiarImagen($event): void {

    if ( $event.target.files.length < 1) {
      this.mensaje('No selecciono archivo', 'Por favor seleccione un archivo.');
      return;
    }

    this.imagenPerfil.nombre = $event.target.files[0].name;
    this.imagenPerfil.tamano = $event.target.files[0].size;
    this.imagenPerfil.tipo = $event.target.files[0].type;

    if (this.imagenPerfil.tipo.split('/')[0] !== 'image') {
      this.mensaje('Archivo no valido', 'Por favor subo un archivo de tipo imagen: jpg, png, etc.');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL($event.target.files[0]);

    reader.onload = ( evento: any ) => {
      this.vistaPrevia = (<FileReader>evento.target).result;
    };

    try {

      this.cargandoImagen = true;
      this.uploader.onBuildItemForm = ( FileItem: any, form: any) => {
        // form.append('account', this.account.code);
      };
      this.uploader.uploadAll();

      // this.uploader.onProgressAll = (progress: any) => {
      //   console.log('Progress: ', progress );
      //   // this.progress = progress;
      // };

      this.uploader.onSuccessItem = (item: any, response: string, status: number, header: any): any => {
        console.log('item: ', item);
        console.log('response: ', response);
        console.log('status: ', status);
        console.log('header: ', header);
        if (response && status === 200) {
          const dataResponse = JSON.parse(response);

          this.usuario.imagenPerfil.url = this.domain + 'uploads/' + dataResponse.generatedName;
          this.usuario.imagenPerfil.extension = dataResponse.originalName.split('.', 2)[1];

          this.cargandoImagen = false;
          this.actualizarUsuario();

        }
      };

    } catch ( error ) {
      console.log( error );
      this.mensaje('Error', 'Error al cargar la imagen');
      this.cargandoImagen = false;
    }
  }

  crearUsuario = () => {
    this.usuarioService.singUp( this.usuario )
    .subscribe( respuesta => {
      this.mensaje('Informacion', 'Usuario creado con exito');
    }, error => {
      this.mensaje('Error', 'Error al crear el usuario')
    });
  }

  // validarContrasena = () => {

  // }

}
