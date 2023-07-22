import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IonModal } from '@ionic/angular';
import { Definition } from 'src/app/interfaces/definition';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Collections } from 'src/app/shared/enums/collections';
import { Series } from 'src/app/shared/interfaces/series';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.page.html',
  styleUrls: ['./glossary.page.scss'],
})
export class GlossaryPage implements OnInit {
  @ViewChild('modal') modal!: IonModal
  modalId: string
  edit = false
  storySeriesList: { id: any, name: string, origin: string }[] = []
  stories!: Story[]
  series!: Series[]
  definitions: Definition[] = []
  filteredDefinitions: Definition[] = []
  selectedFilterID = '0'
  definitionId!: string
  formGroup = new FormGroup({
    concept: new FormControl('', Validators.required),
    definition: new FormControl('', Validators.required),
    originId: new FormControl('', Validators.required),
  })
  alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  constructor(private utils: UtilsService,
    private store: FirestoreService,
    private modalService: ModalService,
    private nav: NavigateService) {
    this.modalId = 'open-modal-' + utils.makeId(5)
  }

  async ngOnInit() {
    let promises = [
      this.store.getAllDocuments(Collections.STORY),
      this.store.getAllDocuments(Collections.SERIES)
    ]
    let data = await Promise.all(promises)
    let stories = (<Story[]>data[0]).map(story => { return { id: story.id, name: story.title, origin: 'story' } })
    let series = (<Series[]>data[1]).map(series => { return { id: series.id, name: series.title, origin: 'series' } })
    this.stories = <Story[]>data[0]
    this.series = <Series[]>data[1]
    this.storySeriesList.push(...stories.concat(series))
    this.storySeriesList.sort((a: any, b: any) => a.name.localeCompare(b.name))

    this.definitions = <Definition[]>(await this.store.getAllDocuments(Collections.GLOSSARY))
    this.definitions.sort((a: any, b: any) => a.concept.localeCompare(b.concept))
    this.filteredDefinitions = [...this.definitions]
  }

  filterDefinitionsByLetter(letter: string) {
    return this.filteredDefinitions.filter(def => {
      return def.concept.toUpperCase().startsWith(letter)
    })
  }

  onSelectChange(ev: any) {

    let id = ev.detail.value
    this.selectedFilterID = id
    console.log(this.filteredDefinitions, id);
    if (id == '0')
      this.filteredDefinitions = [...this.definitions]
    else
      this.filteredDefinitions = this.definitions.filter(def => {
        return def.originId == id
      })

    this.filteredDefinitions.sort((a: any, b: any) => a.concept.localeCompare(b.concept))
    console.log(ev);
  }

  async saveDefinition() {
    const definition: Definition = {
      concept: <string>this.formGroup.controls.concept.value,
      definition: <string>this.formGroup.controls.definition.value,
      originId: <string>this.formGroup.controls.originId.value,
      origin: <'story' | 'series'>this.storySeriesList.find(sty => sty.id == <string>this.formGroup.controls.originId.value)?.origin
    }
    await this.modalService.showLoading()
    
    if (this.edit)
      definition.id = this.definitionId
    
    await this.store.setDocument(Collections.GLOSSARY, definition)
    await this.modalService.stopLoading()


    this.definitions = <Definition[]>(await this.store.getAllDocuments(Collections.GLOSSARY))
    this.definitions.sort((a: any, b: any) => a.concept.localeCompare(b.concept))
    this.filteredDefinitions = [...this.definitions]
    this.edit = false
    await this.modal.dismiss()
  }

  async editItem(res: Definition) {
    console.log('edititem',res);
    this.formGroup.controls.concept.setValue(res.concept)
    this.formGroup.controls.definition.setValue(res.definition)
    this.formGroup.controls.originId.setValue(res.originId)
    this.edit = true
    this.definitionId = <string>res.id
    await this.modal.present()
    //this.nav.navigate(this.resourceType, { editData: res })
  }

  async deleteItem(res: Definition) {
    let action = await this.modalService.presentAlert('Borrar recurso', '¿Estás seguro que deseas borrar este recurso?')
    console.log(action);
    await this.modalService.showLoading()
    if (action) {
      await this.store.deleteDocument(Collections.GLOSSARY, <string>res.id)
      this.definitions = <Definition[]>(await this.store.getAllDocuments(Collections.GLOSSARY))
      this.definitions.sort((a: any, b: any) => a.concept.localeCompare(b.concept))
      this.filteredDefinitions = [...this.definitions]
      this.onSelectChange({ detail: { value: this.selectedFilterID } })
    }
    await this.modalService.stopLoading()

  }

  onWillPresent() {
    if (this.edit) {

    }
  }



  onWillDismiss(ev: any) {
    this.formGroup.controls.concept.setValue('')
    this.formGroup.controls.definition.setValue('')
    this.formGroup.controls.originId.setValue('')
  }

}
