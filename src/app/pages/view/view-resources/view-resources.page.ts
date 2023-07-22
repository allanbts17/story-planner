import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { getSingularName } from 'src/app/shared/classes/resourceData';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { Chapter, SelectableChapter } from 'src/app/shared/interfaces/chapter';
import { Character, charRelationData } from 'src/app/shared/interfaces/character';
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
  character!: Character;
  title: string

  storiesBySeries!: string[]
  storyByResource: string = ''
  chapterByStory!: SelectableChapter[]
  characterByStory: Character[] = []
  placesByStory: Place[] = []
  objectsByStory: Object[] = []


  showAllChapterSummaries = false
  resourceToEdit: any
  showChapters = false
  showCharacters = false
  showPlaces = false
  showObjects = false

  constructor(private nav: NavigateService,
    private store: FirestoreService,
    private modal: ModalService) {
    this.resourceType = nav.getParamById('resourceType')
    const resourceData = nav.getParamById('resource')
    this.resourceToEdit = resourceData
    this.title = 'Ver ' + getSingularName(this.resourceType)
    this.setResource(resourceData)
  }

  


  ngOnInit() {

  }

  async setResource(res: ResourceInterfaces) {
    if (this.resourceType == 'story') {
      this.story = <Story>res
      await this.modal.showLoading()
      this.chapterByStory = (<SelectableChapter[]>(await this.store.getChaptersByStory(<string>res.id))).map(chp => { return { ...chp, select: false } })

      let promises = [
        this.store.getChaptersByStory(<string>res.id),
        this.store.getCharacteresByStory(<string>res.id),
        this.store.getObjectByStory(<string>res.id),
        this.store.getPlacesByStory(<string>res.id)
      ]
      let data = await Promise.all(promises)
      this.chapterByStory = (<SelectableChapter[]>data[0]).map(chp => { return { ...chp, select: false } })
      this.characterByStory = <Character[]>data[1]
      this.objectsByStory = <Object[]>data[2]
      this.placesByStory = <Place[]>data[3]
      console.log(data);
      await this.modal.stopLoading()
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
    } else if (this.resourceType == 'character') {
      this.character = <Character>res
      await this.modal.showLoading()
      if (this.character.basic.storyId)
        this.storyByResource = (await this.store.getDocument(Collections.STORY, this.character.basic.storyId)).title
      await this.modal.stopLoading()
    }
  }

  getGenreText(genList: string[]) {
    return genList.join(', ')
  }

  hasSomeValue(obj: any){
    let keys = Object.keys(obj)
    let allNull = true
    keys.forEach(key => {
      if(obj[key]){
        allNull = false
      }
    })
    //console.log('hay value?',allNull,obj);
    return !allNull
  }

  changeChapterSummaries(){
    this.showAllChapterSummaries = !this.showAllChapterSummaries
    if(!this.showAllChapterSummaries){
      this.chapterByStory.forEach(chp => chp.select = false)
    }
  }

  getTypeRelateds(type: 'Amigo' | 'Enemigo' | 'Familiar' | 'Other'): charRelationData[] {
    if(this.character.relations.character)
      return this.character.relations.character.filter(char => {
        return char.relationType == type
      })
    else return []
  }
  
  editResource(){
    this.nav.navigate(this.resourceType, { editData: this.resourceToEdit })
  }

  viewChapter(chapter: SelectableChapter) {
    if (!this.showAllChapterSummaries)
      chapter.select = !chapter.select
  }

  editChapter(chapter: Chapter) {
    this.nav.navigate('chapter', { editData: chapter })
  }

  async deleteChapter(chapter: Chapter) {
    let action = await this.modal.presentAlert('Borrar capítulo', '¿Estás seguro que deseas borrar este capítulo?')
    console.log(action);
    await this.modal.showLoading()
    if (action) {
      await this.store.deleteDocument(Collections.CHAPTER, <string>chapter.id)
      this.chapterByStory = this.chapterByStory.filter(chp => chp.id != chapter.id)
    }
    await this.modal.stopLoading()
  }

}
