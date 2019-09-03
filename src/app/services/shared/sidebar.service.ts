import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mid-gauge',
      submenu: [
        { titulo: 'Dahsboard', url: '/dashboard' },
        { titulo: 'ProgressBar', url: '/progress' },
        { titulo: 'Gráficas', url: '/graficas1' }
      ]
    }
  ];

  constructor() { }
}
