import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { ModalService } from 'src/app/services/modal.service';
import { NavigateService } from 'src/app/services/navigate.service';
import { StorageService } from 'src/app/services/storage.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ResourceInterfaces } from 'src/app/shared/classes/types';
import { Collections } from 'src/app/shared/enums/collections';
import { DataPaths } from 'src/app/shared/enums/data-paths';
import { Place } from 'src/app/shared/interfaces/place';
import { Story } from 'src/app/shared/interfaces/story';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})

export class PlacePage {
  edit = false
  resourseData: ResourceInterfaces
  
  constructor(private nav: NavigateService) {
    this.resourseData = this.nav.getParamById('editData')
    if (!this.resourseData) return;
    this.edit = true
  }

}
