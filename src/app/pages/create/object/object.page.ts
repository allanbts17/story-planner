import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Collections } from 'src/app/shared/enums/collections';
import { DataPaths } from 'src/app/shared/enums/data-paths';
import { Object } from 'src/app/shared/interfaces/object';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-object',
  templateUrl: './object.page.html',
  styleUrls: ['./object.page.scss'],
})
export class ObjectPage implements OnInit {
  imageData!: string | ArrayBuffer | null | undefined;
  storiesList!: Story[]

  formGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    nickname: new FormControl(''),
    description: new FormControl('', Validators.required),
    additionalInfo: new FormControl(''),
    storyId: new FormControl('')
  })

  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService,
    private storage: StorageService,
    private utils: UtilsService) { }

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

  async saveObject() {
    await this.modal.showLoading()
    try {
      let imageUrl = null
      if (this.imageData)
        imageUrl = await this.storage.uploadBase64(<string>this.imageData, DataPaths.OBJECT_IMAGES, this.utils.makeId(10), 'png')
      let storyId = <string>this.formGroup.controls.storyId.value
      const object: Object = {
        name: <string>this.formGroup.controls.name.value,
        nickname: <string>this.formGroup.controls.nickname.value || null,
        description: <string>this.formGroup.controls.description.value,
        additionalInfo: <string>this.formGroup.controls.additionalInfo.value || null,
        storyId: storyId == '0' ? null:storyId,
        image: imageUrl,
      }

      await this.store.addDocument(Collections.OBJECT, object)
      this.nav.navigate('home', { tabId: 'object' })
    } catch (err) {
      console.log(err);
    }
    await this.modal.stopLoading()
  }

}
