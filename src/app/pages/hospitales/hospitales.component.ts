import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';

import { ModalUploadService } from 'src/app/components/modal-upload/modal-upload.service';

//declare var swal: any;
import swal from 'sweetalert';
import { URL_SERVICIOS } from '../../config/config';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html'
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;
  nuevoHospital: boolean = true;

  constructor( public _hospitalService: HospitalService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {
    this.nuevoHospital = false;
    this.cargando = true;
    //console.log( hospital );

    this._hospitalService.cargarHospitales( this.desde )
      .subscribe( (resp: any) => {
        this.hospitales = resp.hospitales;
        this.totalRegistros = resp.total;
      });

    this.cargando = false;
  }

  buscarHospital( termino: string ) {
    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;
    this._hospitalService.buscarhospital( termino )
      .subscribe( resp => {
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  abrirModalCrearHospital() {
    this.nuevoHospital = true;
  }

  cerrarModalCrearHospital() {
    this.nuevoHospital = false;
  }

  crearHospital( nombre: string ) {
    if( nombre.length === 0 ) {
      swal('Error', 'Para crear un hospital deberá ingresar un nombre', 'error');
      return;
    }

    let hospital = new Hospital(
      nombre = nombre
    );

    this._hospitalService.crearHospital( hospital ).subscribe();
    this.cargarHospitales();
  }

  crearHospital2() {
    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: {
        element: "input",
        attributes: {
          placeholder: "Nombre del hospital",
          type: "input",
        }},
      icon: 'info',
      buttons: [true, "Aceptar"],
      dangerMode: true,
    }).then( (valor: string) => {
      
      console.log( valor );
      
      if( !valor || valor.length === 0 ){
        return;
      }
            
      this._hospitalService.crearHospital( {nombre : valor} )
        .subscribe( () => this.cambiarDesde( 0 ));
    
    });
  }

  guardarhospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital ).subscribe();
  }

  borrarhospital( hospital: Hospital ) {
    swal({
      title: 'Está seguro?',
      text: 'Esta a punto de borrar al hospital ' + hospital.nombre,
      icon: 'warning',
      buttons: [true, "Aceptar"],
      dangerMode: true,
    }).then( borrar => {
      console.log( borrar );
      if( borrar ){
        this._hospitalService.borrarHospital( hospital._id )
          .subscribe( borrado => {
            this.cambiarDesde( 0 );
          });
      }
    });
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;

    if( desde >= this.totalRegistros) {
      return;
    }

    if( desde < 0 ) {
      return;
    }

    if( valor === 0 ) {
      this.desde = 0;
    } else {
      this.desde += valor;
    }

    this.cargarHospitales();
  }
}
