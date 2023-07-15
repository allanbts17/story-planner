import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Collections } from 'src/app/shared/enums/collections';
import { DataPaths } from 'src/app/shared/enums/data-paths';
import { Story } from 'src/app/shared/interfaces/story';


@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  @ViewChild('imageContainer') imageContainer!: ElementRef;
  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    series: new FormControl(''),
    genre: new FormControl(<string[]>[], this.haveGenre()),
    auxGenre: new FormControl(''),
    synopsis: new FormControl('', Validators.required)
  })
  genreList: string[] = []
  imageData!: any | string | ArrayBuffer | null;
  isApp: boolean
  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService,
    private platform: Platform,
    private storage: StorageService,
    private utils: UtilsService
  ) {

    if (this.platform.is('mobileweb')) {
      this.isApp = false;

    } else {
      this.isApp = true;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      this.pasteImage()
    }, 200)
  }

  pasteImage() {
    let imageArea = document.getElementById("story-image-copy-area")
    if (imageArea) {
      imageArea.addEventListener('paste', (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;

        if (items) {
          for (let i = 0; i < items.length; i++) {
            const item = items[i];
            if (item.type.indexOf('image') !== -1) {
              const blob = item.getAsFile();
              console.log(blob?.name);
              //console.log( blob?.type);
              const reader = new FileReader();
              reader.onload = (event: ProgressEvent<FileReader>) => {
                this.imageData = event.target?.result;
                console.log(this.imageData);
              };
              reader.readAsDataURL(<any>blob);
            }
          }
        }
      });
      document.execCommand('paste');
    } else {
      setTimeout(() => {
        this.pasteImage()
      }, 200)
    }

  }

  // Añadir imagen, opcional
  // Los datos son los generales, pero en un ver más o avanzados, saldría
  // capitulos, escenas, personajes, lugares, y muchas cosas que se pueden asignar. Serie debería se un select donde muestra las series existentes.

  addGenre() {
    if (this.formGroup.controls.auxGenre.value == '') return
    this.genreList.push(<string>this.formGroup.controls.auxGenre.value)
    this.formGroup.controls.auxGenre.setValue('')
    this.formGroup.controls.genre.setValue(this.genreList)

  }

  deleteGenre(genre: string) {
    this.genreList = this.genreList.filter(gre => gre !== genre)
    this.formGroup.controls.genre.setValue(this.genreList)

  }

  async saveStory() {
    await this.modal.showLoading()
    try {
      let imageUrl = null
      if (this.imageData)
        imageUrl = await this.storage.uploadBase64(this.imageData, DataPaths.STORY_IMAGES, this.utils.makeId(10), 'png')
      const story: Story = {
        title: <string>this.formGroup.controls.title.value,
        series: <string>(this.formGroup.controls.series.value || ""),
        image: imageUrl,
        genre: this.genreList,
        sipnopsis: <string>this.formGroup.controls.synopsis.value,
        //   title: <string>this.formGroup.controls.title.value,
      }

      await this.store.addDocument(Collections.STORY, story)
      this.nav.navigate('home')
    } catch (err) {
      console.log(err);
    }


    await this.modal.stopLoading()

  }

  haveGenre(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value?.length && control.value?.length > 0)
        return null
      else
        return { noGenre: true }
    }
  }

}
