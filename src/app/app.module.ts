import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTES } from './app.routes';

// MODULOS
import { PagesModule } from './pages/pages.module';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
//import { IncrementadorComponent } from './components/incrementador/incrementador.component';
//import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';

// TEMPORAL
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    //IncrementadorComponent
    //GraficoDonaComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
