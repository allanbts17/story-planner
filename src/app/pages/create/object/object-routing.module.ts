import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObjectPage } from './object.page';

const routes: Routes = [
  {
    path: '',
    component: ObjectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObjectPageRoutingModule {}
