import { Component, OnInit } from '@angular/core';
import { NavigateService } from './services/navigate.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public createItems = [
    { title: 'Nueva serie', url: 'series', icon: 'layers' },
    { title: 'Nueva historia', url: 'story', icon: 'create' },
    { title: 'Nuevo capítulo', url: 'chapter', icon: 'reader' },
    { title: 'Nueva escena', url: 'scene', icon: 'film' },
    { title: 'Nuevo personaje', url: 'character', icon: 'person' },
    { title: 'Nuevo lugar', url: 'place', icon: 'image' },
    { title: 'Nuevo objeto', url: 'object', icon: 'cube' },
    { title: 'Nuevo mundo', url: 'world', icon: 'planet' }
  ];
  public generalItems = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Evolución', url: 'evolution', icon: 'swap-horizontal' },
    { title: 'Glosario', url: 'glosary', icon: 'archive' }
  ]
  constructor(protected nav: NavigateService) {}

  ngOnInit(): void {
    this.nav.navigate('home')
  }


}
