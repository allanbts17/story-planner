import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title: string = ''
  @Input() showEdit: boolean = false
  @Input() showHome = true
  @Input() modal: any
  @Output() editEvent = new EventEmitter<any>()
  //@Output() homeEvent = new EventEmitter<any>()
  constructor(private nav: NavigateService) { }

  ngOnInit() {}

  onEdit(){
    this.editEvent.emit()
  }

  onHome(){
    this.nav.navigate('home')
  }

  onClose(){

  }

}
