import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Series } from 'src/app/shared/interfaces/series';
import { Story } from 'src/app/shared/interfaces/story';


type GenericResource = {
  image: string | null;
  title: string;
  subtitle: string;
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
  constructor() { }

  setResourceList(resourceList: ResourceInterfaces[], resourceType: string) {
    this.resourceType = resourceType
    console.log(resourceType, resourceList);
    if (resourceType == 'story') {
      let res: Story[] = <Story[]>resourceList
      this.list = res.map(data => {
        return {
          image: data.image,
          title: data.title,
          subtitle: data.synopsis
        } as GenericResource
      })
    } else if (resourceType == 'series') {
      let res: Series[] = <Series[]>resourceList
      console.log(res);
      this.list = res.map(data => {
        return {
          image: data.image,
          title: data.title,
          subtitle: data.synopsis
        } as GenericResource
      })
    } else {
      this.list = []
    }
  }



}
