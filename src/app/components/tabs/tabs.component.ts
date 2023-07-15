import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SegmentChangeEventDetail, SegmentCustomEvent } from '@ionic/angular';
import { NavigateService } from 'src/app/services/navigate.service';
import { TabData } from 'src/app/shared/interfaces/tab-data';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent  implements OnInit {
  @Input() items!: TabData[]
  @Output() selectedEvent = new EventEmitter<TabData>
  defaultItem!: string
  constructor(private nav: NavigateService) { 
    
  }

  ngOnInit() {
    this.defaultItem = this.nav.getParamById('tabId') ||  this.items[0].id
    this.selectedEvent.emit(<TabData>this.items.find(item => item.id == this.defaultItem))
  }

  onSelect(ev: any){
    let tabId = ev?.detail?.value
    console.log(tabId);

    this.selectedEvent.emit(<TabData>this.items.find(item => item.id == tabId))
  }

}
