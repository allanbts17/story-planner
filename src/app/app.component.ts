import { Component, OnInit } from '@angular/core';
import { NavigateService } from './services/navigate.service';
import { ClipboardService } from './services/clipboard.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  wideScreen: boolean
  public createItems = [
    { title: 'Nueva serie', url: 'series', icon: 'layers' },
    { title: 'Nueva historia', url: 'story', icon: 'create' },
    { title: 'Nuevo capítulo', url: 'chapter', icon: 'reader' },
    //{ title: 'Nueva escena', url: 'scene', icon: 'film' },
    { title: 'Nuevo personaje', url: 'character', icon: 'person' },
    { title: 'Nuevo lugar', url: 'place', icon: 'image' },
    { title: 'Nuevo objeto', url: 'object', icon: 'cube' },
    //{ title: 'Nuevo mundo', url: 'world', icon: 'planet' }
  ];
  public generalItems = [
    { title: 'Inicio', url: 'home', icon: 'home' },
    { title: 'Evolución', url: 'evolution', icon: 'swap-horizontal' },
    { title: 'Glosario', url: 'glossary', icon: 'archive' }
  ]

  constructor(protected nav: NavigateService,
    private clipboard: ClipboardService) {
    let width = window.screen.width
    this.wideScreen = width > 991
    console.log(width);//991
  }

  ngOnInit(): void {

    // setInterval(async ()=>{
    //   await this.clipboard.checkClipboard()
    // },1000)
    this.nav.navigate('home')
  }




}
