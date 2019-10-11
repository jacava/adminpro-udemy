import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor( 
    public _usuarioServices: UsuarioService,
    public router: Router
  ) {}

  canActivate(): Promise<boolean>| boolean {
    console.log('Token Guard');
    
    let token = this._usuarioServices.token;
    let payload = JSON.parse( atob( token.split('.')[1] ) ); // La fecha está en segundos
    let expirado = this.expirado( payload.exp );

    if( expirado ){
      this.router.navigate(['/login']);
      return false;
    }


    return this.verificaRenueva( payload.exp );
  }

  verificaRenueva( fechaExp: number ):Promise<boolean> {
    return new Promise( (resolve, reject) => {
      let tokenExp = new Date( fechaExp * 1000 );
      let ahora = new Date();

      ahora.setTime( ahora.getTime() + (4 * 60 * 60 * 1000) ); // Lo incremento 4 hs.

      if( tokenExp.getTime() > ahora.getTime() ) { // Falta mas de 4 hs
        resolve(true);
      } else {
        this._usuarioServices.renuevaToken()
          .subscribe( () => {
            resolve(true);
          }, () => {
            this.router.navigate(['/login']);
            reject(false);
          });
      }

      resolve( true );
    });
  }
  
  expirado( fechaExp: number ) {
    
    let ahora = new Date().getTime() / 1000;
    
    if ( fechaExp < ahora ) {
      return true;
    } else {
      return false;
    }
  }

}
