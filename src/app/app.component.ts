import { Component, OnInit } from '@angular/core';
import { NavigateService } from './services/navigate.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public createItems = [
    { title: 'Nueva serie', url: '/folder/inbox', icon: 'layers' },
    { title: 'Nueva historia', url: 'story', icon: 'create' },
    { title: 'Nuevo capítulo', url: '/folder/favorites', icon: 'reader' },
    { title: 'Nueva escena', url: '/folder/archived', icon: 'film' },
    { title: 'Nuevo personaje', url: '/folder/trash', icon: 'person' },
    { title: 'Nuevo lugar', url: '/folder/spam', icon: 'image' },
    { title: 'Nuevo objeto', url: '/folder/spam', icon: 'cube' },
    { title: 'Nuevo mundo', url: '/folder/spam', icon: 'planet' }
  ];
  public generalItems = [
    { title: 'Inicio', url: '/home', icon: 'home' },
    { title: 'Evolución', url: '/folder/outbox', icon: 'swap-horizontal' },
    { title: 'Biblioteca', url: '/folder/favorites', icon: 'archive' }
  ]
  constructor(protected nav: NavigateService) {}

  ngOnInit(): void {
    this.nav.navigate('home')
  }


}
