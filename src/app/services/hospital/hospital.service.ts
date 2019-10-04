import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Hospital } from '../../models/hospital.model';

import { UsuarioService } from '../usuario/usuario.service';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  hospital: Hospital;

  constructor( 
    public http: HttpClient, 
    public _usuarioService: UsuarioService, 
    public _subirArchivoService: SubirArchivoService ) {
  }

  buscarhospital( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.hospitales ));
  }

  obtenerHospital(	id:	string	) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        //console.log( id );
        //console.log( resp );
        return resp.hospital;
      })
    );
  }

  cargarHospitales( desde: number = 0 ) {
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp;
      })
    );
  }

  crearHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, hospital ).pipe(
      map( (resp: any) => {
//        console.log( hospital );
 //       console.log( resp );
        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }

  actualizarHospital( hospital: Hospital ) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;

    return this.http.put( url, hospital ).pipe(
      map( (resp: any) => {

        swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    );
  }

  cambiarImagen( archivo: File, id: string ) {
    this._subirArchivoService.subirArchivo( archivo, 'hospitales', id )
      .then( (resp: any) => {
        //console.log( resp );
        this.hospital.img = resp.hospital.img;
        swal('Imagen Actualizada', this.hospital.nombre, 'success');
      })
      .catch( resp => {
        console.log( 'Catch: ', resp );
      });
  }

  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url ).pipe(
      map( resp => {
        swal('Hospital borrado', 'El hospital a sido eliminado correctamente', 'success');
        return true;
      })
    );
  }

}
