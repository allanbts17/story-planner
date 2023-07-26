import { Component, OnInit, ViewChild } from '@angular/core';
import { TabData } from 'src/app/shared/interfaces/tab-data';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { Resources } from 'src/app/shared/classes/resourceData';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { ResourceListComponent } from 'src/app/components/resource-list/resource-list.component';
import { UtilsService } from 'src/app/services/utils.service';

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

  constructor(private store: FirestoreService,
    private modal: ModalService,
    
    private util: UtilsService) { }

  ngOnInit() {
    // const obj = {
    //   name: 'Allan',
    //   id: 34,
    //   last: "Benn",
    //   city: {
    //     lance: 'Panama',
    //     size: 3000
    //   },
    //   list: [
    //     {
    //       age: 27,
    //       name: 'Mon'
    //     },
    //     {
    //       age: 17,
    //       name: 'Anon'
    //     }
    //   ]
    // }
    // const obj2 = {
    //   name: 'Alla',
    //   last: "Benn",
    //   id: 34,
    //   city: {
    //     lance: 'Panama',
    //     size: 3005
    //   },
    //   list: [
    //     {
    //       age: 27,
    //       name: 'Mon'
    //     },
    //     {
    //       age: 17,
    //       name: 'Anon'
    //     },{
    //       lat:2
    //     }
    //   ]
    // }
    // let d = this.util.getChanges(obj,obj2)
    // console.log('changes',d);
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
