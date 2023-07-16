import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { getSingularName } from 'src/app/shared/classes/resourceData';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { Object } from 'src/app/shared/interfaces/object';
import { Place } from 'src/app/shared/interfaces/place';
import { Series } from 'src/app/shared/interfaces/series';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-view-resources',
  templateUrl: './view-resources.page.html',
  styleUrls: ['./view-resources.page.scss'],
})
export class ViewResourcesPage implements OnInit {
  resourceType!: string
  story!: Story;
  series!: Series;
  place!: Place;
  object!: Object;
  title: string

  storiesBySeries!: string[]
  storyByResource: string = ''
  constructor(private nav: NavigateService,
    private store: FirestoreService,
    private modal: ModalService) {
    this.resourceType = nav.getParamById('resourceType')
    const resourceData = nav.getParamById('resource')
    this.title = 'Ver ' + getSingularName(this.resourceType)
    this.setResource(resourceData)
  }


  ngOnInit() {
  }

  async setResource(res: ResourceInterfaces) {
    if (this.resourceType == 'story') {
      this.story = <Story>res
    } else if (this.resourceType == 'series') {
      this.series = <Series>res
      await this.modal.showLoading()
      this.storiesBySeries = (await this.store.getStoriesBySeries(<string>res.id)).map(sty => sty.title)
      await this.modal.stopLoading()
    } else if (this.resourceType == 'place') {
      this.place = <Place>res
      await this.modal.showLoading()
      if (this.place.storyId)
        this.storyByResource = (await this.store.getDocument(Collections.STORY, this.place.storyId)).title
      await this.modal.stopLoading()
    } else if (this.resourceType == 'object') {
      this.object = <Object>res
      await this.modal.showLoading()
      if (this.object.storyId)
        this.storyByResource = (await this.store.getDocument(Collections.STORY, this.object.storyId)).title
      await this.modal.stopLoading()
    }
  }

  getGenreText(genList: string[]) {
    return genList.join(', ')
  }

}
