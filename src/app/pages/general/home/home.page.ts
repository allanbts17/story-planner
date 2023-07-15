import { Component, OnInit } from '@angular/core';
import { TabData } from 'src/app/interfaces/tab-data';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { Resources } from 'src/app/shared/classes/resourceData';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  tabList: TabData[] = Resources
  selectedTab!: string
  dataList!: ResourceInterfaces[]
  constructor(private store: FirestoreService,
    private modal: ModalService) { }

  ngOnInit() {
  }

  async tabSelected(tab: string){
    this.modal.showLoading()
    if(tab == 'story'){
      this.dataList = <ResourceInterfaces[]><unknown>(await this.store.getAllDocuments(Collections.STORY))
    }

    console.log('dataList',this.dataList);

    this.selectedTab = tab
    this.modal.stopLoading()
  }

}
