import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SegmentChangeEventDetail, SegmentCustomEvent } from '@ionic/angular';
import { TabData } from 'src/app/interfaces/tab-data';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  @Input() items!: TabData[]
  @Output() selectedEvent = new EventEmitter<string>

  constructor() { }

  ngOnInit() {}

  onSelect(ev: any){
    
    console.log(ev?.detail?.value);
    this.selectedEvent.emit(<string>ev?.detail.value)
  }

}
