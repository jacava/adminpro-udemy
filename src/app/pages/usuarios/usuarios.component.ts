import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

//declare var swal: any;
import swal from 'sweetalert';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  
  constructor(
    public _usuariosService: UsuarioService, 
    public _modalUploadService: ModalUploadService,
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'usuarios', id );
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuariosService.cargarUsuarios( this.desde )
      .subscribe( (resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
      });
    
    this.cargando = false;
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    //console.log( desde );

    if( desde >= this.totalRegistros) {
      return;
    }

    if( desde < 0 ) {
      return;
    }

    if( valor === 0 ){
      this.desde = 0;  
    } else {
      this.desde += valor;
    }
    this.cargarUsuarios();

  }

  buscarUsuario( termino: string ) {
    if( termino.length <= 0 ) {
      this.cargarUsuarios();
      return;
    }
    
    this.cargando = true;
    this._usuariosService.buscarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {
        //console.log( usuarios );
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  borrarUsuario( usuario: Usuario ) {
    if( usuario._id === this._usuariosService.usuario._id ){
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: [true, "Aceptar"],
      dangerMode: true,
    }).then( borrar => {
      console.log( borrar );
      if( borrar ){
        this._usuariosService.borrarUsuario( usuario._id )
          .subscribe( borrado => {
            console.log( borrado );
            //this.cargarUsuarios();
            this.cambiarDesde( 0 );
          });
      }
    });

  }

  guardarUsuario( usuario: Usuario) {
    this._usuariosService.actualizarUsuario( usuario )
      .subscribe();
  }


}
