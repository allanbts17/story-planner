import { Component } from '@angular/core';
import { NavigateService } from 'src/app/services/navigate.service';
import { ResourceInterfaces } from 'src/app/shared/classes/types';


@Component({
  selector: 'app-object',
  templateUrl: './object.page.html',
  styleUrls: ['./object.page.scss'],
})
export class ObjectPage {
  editData: ResourceInterfaces
  edit = false

  constructor(private nav: NavigateService) {
      this.editData = this.nav.getParamById('editData')
      if (!this.editData) return;
      this.edit = true
  }

}
