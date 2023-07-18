import { Component, OnInit, ViewChild } from '@angular/core';
import { TabData } from 'src/app/shared/interfaces/tab-data';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { Resources } from 'src/app/shared/classes/resourceData';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { ResourceListComponent } from 'src/app/components/resource-list/resource-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(ResourceListComponent) resourceList!: ResourceListComponent
  tabList: TabData[] = Resources
  selectedTab!: string
  dataList!: ResourceInterfaces[]
  test = 'asd'
  step = 0
  constructor(private store: FirestoreService,
    private modal: ModalService) { }

  ngOnInit() {

  }

  changetest(){
    this.test = this.test == 'asd'? 'man':'asd'
    this.step = this.step==0? 1:0
  }

  async tabSelected(tab: TabData){
    await this.modal.showLoading()
    this.dataList = <ResourceInterfaces[]><unknown>(await this.store.getAllDocuments(tab.collection))
    //console.log('dataList',this.dataList);
    console.log(tab);
    this.selectedTab = tab.id
    this.resourceList.setResourceList(this.dataList,tab.id)
    await this.modal.stopLoading()
  }

}
