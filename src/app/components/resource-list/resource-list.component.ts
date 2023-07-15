import { Component, Input, OnInit } from '@angular/core';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Story } from 'src/app/shared/interfaces/story';

type GenericResource = {
  image: string|null;
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-resource-list',
  templateUrl: './resource-list.component.html',
  styleUrls: ['./resource-list.component.scss'],
})

export class ResourceListComponent  implements OnInit {
  @Input() resourceList!: ResourceInterfaces[]
  @Input() resourceType!: string
  list!: GenericResource[]
  constructor() { }

  ngOnInit() {
    console.log(this.resourceList);
    if(this.resourceType == 'story'){
      let res: Story[] = <Story[]>this.resourceList
      this.list = res.map(data=>{
        return {
          image: data.image,
          title: data.title,
          subtitle: data.sipnopsis
        } as GenericResource
      })
    }
  }



}
