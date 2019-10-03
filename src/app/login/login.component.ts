import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';

// Esta funcion la escibimos en custom.js, permite la recarga
declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;

  auth2: any;
  
  constructor( public router: Router, public _usuarioService: UsuarioService ) { }

  ngOnInit() {
    init_plugins();
    this.googleIniit();

    this.email = localStorage.getItem('email') || ''; //se utiliza el || para indicar que si no viene valor asigne ''.
    if ( this.email.length > 0 ) {
      this.recuerdame = true;
    } else {
      this.recuerdame = false;
    }

  }

  googleIniit() {
    gapi.load( 'auth2', () => {
      this.auth2 = gapi.auth2.init({
        //client_id: '<<GOOGLE_ID>>',

        coockiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      
      this. attachSingin( document.getElementById('btnGoogle') );

    });
  }

  attachSingin( element ) {
    this.auth2.attachClickHandler( element, {}, googleUser => {
      //let profile = googleUser.getBasicProfile();
      //console.log( profile );

      let token = googleUser.getAuthResponse().id_token;
      //console.log( token );
      this._usuarioService.loginGoogle( token )
        //.subscribe( resp => this.router.navigate(['/dashboard']));
        .subscribe( resp => window.location.href = '#/dashboard'); //Lo hicimos de esta forma porque con la otra en el primer login no refersca bien la página. Asi no la recargamos y evitamos ese problema
      
    });
  }

  ingresar( forma: NgForm ) {

    if ( forma.invalid ) {
      return;
    }

    let usuario = new Usuario( null, forma.value.email, forma.value.password );
    this._usuarioService.login( usuario, forma.value.recuerdame )
      .subscribe( correcto => this.router.navigate(['/dashboard']));

    /*console.log( forma.valid );
    console.log( forma.value );*/

  }

}
