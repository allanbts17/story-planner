import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { getResourceCollectionById } from 'src/app/shared/classes/resourceData';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Object } from 'src/app/shared/interfaces/object';
import { Place } from 'src/app/shared/interfaces/place';
import { Series } from 'src/app/shared/interfaces/series';
import { Story } from 'src/app/shared/interfaces/story';


type GenericResource = {
  image: string | null;
  title: string;
  subtitle: string;
  raw: ResourceInterfaces;
}

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})

export class ResourceListComponent {
  // @Input() resourceList!: ResourceInterfaces[]
  // @Output() resourceListChange = new EventEmitter<ResourceInterfaces[]>()
  // @Input() resourceType!: string
  // @Output() resourceTypeChange = new EventEmitter<string>()
  protected list!: GenericResource[]
  private resourceType!: string
  constructor(private nav: NavigateService, private store: FirestoreService, private modal: ModalService) { }

  setResourceList(resourceList: ResourceInterfaces[], resourceType: string) {
    this.resourceType = resourceType
    console.log(resourceType, resourceList);
    if (resourceType == 'story') {
      let res: Story[] = <Story[]>resourceList
      this.list = res.map(data => {
        return {
          image: data.image,
          title: data.title,
          subtitle: data.synopsis,
          raw: data
        } as GenericResource
      })
    } else if (resourceType == 'series') {
      let res: Series[] = <Series[]>resourceList
      console.log(res);
      this.list = res.map(data => {
        return {
          image: data.image,
          title: data.title,
          subtitle: data.synopsis,
          raw: data
        } as GenericResource
      })
    } else if (resourceType == 'place') {
      let res: Place[] = <Place[]>resourceList
      console.log(res);
      this.list = res.map(data => {
        return {
          image: data.image,
          title: data.name,
          subtitle: data.generalDescription,
          raw: data
        } as GenericResource
      })
    } else if (resourceType == 'object') {
      let res: Object[] = <Object[]>resourceList
      console.log(res);
      this.list = res.map(data => {
        return {
          image: data.image,
          title: data.name,
          subtitle: data.description,
          raw: data
        } as GenericResource
      })
    } else {
      this.list = []
    }
  }

  async deleteItem(res: ResourceInterfaces) {
    let action = await this.modal.presentAlert('Borrar recurso', '¿Estás seguro que deseas borrar este recurso?')
    console.log(action);
    await this.modal.showLoading()
    if (action){
      await this.store.deleteDocument(getResourceCollectionById(this.resourceType), <string>res.id)
      this.list = this.list.filter(lst => lst.raw.id != res.id)
    }
    await this.modal.stopLoading()
      
  }

  editItem(res: ResourceInterfaces) {
    this.nav.navigate(this.resourceType, { editData: res })
  }

  viewItem(res: ResourceInterfaces){
    this.nav.navigate('view-resources',{ resourceType: this.resourceType, resource: res })
  }


}
