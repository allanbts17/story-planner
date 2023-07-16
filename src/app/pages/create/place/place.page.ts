import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Collections } from 'src/app/shared/enums/collections';
import { DataPaths } from 'src/app/shared/enums/data-paths';
import { Place } from 'src/app/shared/interfaces/place';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})

export class PlacePage implements OnInit {
  imageData!: string | ArrayBuffer | null | undefined;
  storiesList!: Story[]
  edit = false
  editAndImageChanged: string | null = null
  resId!: string

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl(''),
    generalDescription: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    storyId: new FormControl(''),
    view: new FormControl(''),
    smell: new FormControl(''),
    sound: new FormControl('')
  })

  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService,
    private storage: StorageService,
    private utils: UtilsService) {
    this.setData()
  }

  setData() {
    const editData: Place = this.nav.getParamById('editData')
    if (!editData) return;
    this.edit = true
    this.resId = <string>editData.id;
    this.formGroup.controls.name.setValue(editData.name)
    this.formGroup.controls.nickname.setValue(editData.nickname)
    this.formGroup.controls.generalDescription.setValue(editData.generalDescription)
    this.formGroup.controls.content.setValue(editData.content)
    this.formGroup.controls.storyId.setValue(editData.storyId || '0')
    this.formGroup.controls.view.setValue(editData.feelAtributes.view)
    this.formGroup.controls.smell.setValue(editData.feelAtributes.smell)
    this.formGroup.controls.sound.setValue(editData.feelAtributes.sound)
    this.imageData = editData.image
    this.editAndImageChanged = this.imageData
  }

  async ngOnInit() {
    this.storiesList = (await this.store.getAllDocuments(Collections.STORY)) || []
    this.storiesList.push({
      id: '0',
      title: 'Sin historia',
      synopsis: '',
      series: null,
      image: null,
      genre: [],
    })
  }

  async savePlace() {
    await this.modal.showLoading()
    try {
      let imageUrl = null
      if (this.imageData && this.editAndImageChanged != this.imageData)
        imageUrl = await this.storage.uploadBase64(<string>this.imageData, DataPaths.PLACE_IMAGES, this.utils.makeId(10), 'png')
      let storyId = <string>this.formGroup.controls.storyId.value
      const place: Place = {
        name: <string>this.formGroup.controls.name.value,
        nickname: <string>this.formGroup.controls.nickname.value || null,
        generalDescription: <string>this.formGroup.controls.generalDescription.value,
        content: <string>this.formGroup.controls.content.value,
        storyId: storyId == '0' ? null : storyId,
        image: imageUrl || this.editAndImageChanged,
        feelAtributes: {
          view: <string>this.formGroup.controls.view.value || null,
          smell: <string>this.formGroup.controls.smell.value || null,
          sound: <string>this.formGroup.controls.sound.value || null,
        }
      }
      if(this.edit) place.id = this.resId

      await this.store.setDocument(Collections.PLACE, place)
      this.nav.navigate('home', { tabId: 'place' })
    } catch (err) {
      console.log(err);
    }
    await this.modal.stopLoading()
  }

}
