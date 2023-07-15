import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Collections } from 'src/app/shared/enums/collections';
import { DataPaths } from 'src/app/shared/enums/data-paths';
import { Series } from 'src/app/shared/interfaces/series';

@Component({
  selector: 'app-series',
  templateUrl: './series.page.html',
  styleUrls: ['./series.page.scss'],
})
export class SeriesPage implements OnInit {
  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    synopsis: new FormControl('', Validators.required),
  })
  imageData!: string | ArrayBuffer | null | undefined;
  constructor(private store: FirestoreService,
    private modal: ModalService,
    private nav: NavigateService,
    private storage: StorageService,
    private utils: UtilsService) { }

  ngOnInit() {
  }

  async saveSerie() {
    await this.modal.showLoading()
    try {
      let imageUrl = null
      if (this.imageData)
        imageUrl = await this.storage.uploadBase64(<string>this.imageData, DataPaths.SERIES_IMAGES, this.utils.makeId(10), 'png')
      const series: Series = {
        title: <string>this.formGroup.controls.title.value,
        synopsis: <string>this.formGroup.controls.synopsis.value,
        image: imageUrl,
      }
      await this.store.addDocument(Collections.SERIES, series)
      this.nav.navigate('home',{ tabId: 'series'})
    } catch (err) {
      console.log(err);
    }


    await this.modal.stopLoading()

  }

}
