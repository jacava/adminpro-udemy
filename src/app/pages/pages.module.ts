import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';

// ng2 - Charts
import { ChartsModule } from 'ng2-charts';

// TEMPORAL
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
      PagesComponent,
      DashboardComponent,
      ProgressComponent,
      Graficas1Component,
      IncrementadorComponent,
      GraficoDonaComponent
    ],
    exports: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        ChartsModule,
        CommonModule
    ]
  })
  export class PagesModule { }