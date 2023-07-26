import { Component } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ResourceInterfaces } from 'src/app/shared/classes/types';


@Component({
  selector: 'app-character',
  templateUrl: './character.page.html',
  styleUrls: ['./character.page.scss'],
})

export class CharacterPage {
  edit = false
  edtiData!: ResourceInterfaces

  constructor(private nav: NavigateService) {
    this.edtiData = this.nav.getParamById('editData')
    if (!this.edtiData) return;
    this.edit = true
  }


}
