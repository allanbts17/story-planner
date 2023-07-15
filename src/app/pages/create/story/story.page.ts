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
import { Series } from 'src/app/shared/interfaces/series';
import { Story } from 'src/app/shared/interfaces/story';


@Component({
  selector: 'app-story',
  templateUrl: './story.page.html',
  styleUrls: ['./story.page.scss'],
})
export class StoryPage implements OnInit {
  //@ViewChild('imageContainer') imageContainer!: ElementRef;
  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    series: new FormControl(),
    genre: new FormControl(<string[]>[], this.haveGenre()),
    auxGenre: new FormControl(''),
    synopsis: new FormControl('', Validators.required)
  })
  genreList: string[] = []
  imageData!: string | ArrayBuffer | null | undefined;
  seriesList!: Series[]
  
  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService,
    private storage: StorageService,
    private utils: UtilsService
  ) {

   
  }

  async ngOnInit() {
    this.seriesList = (await this.store.getAllDocuments(Collections.SERIES)) || []
    this.seriesList.push({
      id: '0',
      title: 'Sin serie',
      synopsis: '',
      image: null
    })
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

  getSeries(){
    let id: string = this.formGroup.controls.series.value
    let serie: Series = <Series>this.seriesList.find(sre => sre.id == id)
    return serie.id == '0'? null:serie
  }

  async saveStory() {
    await this.modal.showLoading()
    try {
      let imageUrl = null
      if (this.imageData)
        imageUrl = await this.storage.uploadBase64(<string>this.imageData, DataPaths.STORY_IMAGES, this.utils.makeId(10), 'png')
      const story: Story = {
        title: <string>this.formGroup.controls.title.value,
        series: this.getSeries(),
        image: imageUrl,
        genre: this.genreList,
        synopsis: <string>this.formGroup.controls.synopsis.value,
        //   title: <string>this.formGroup.controls.title.value,
      }

      await this.store.addDocument(Collections.STORY, story)
      this.nav.navigate('home',{ tabId: 'story'})
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
