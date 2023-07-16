import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewResourcesPage } from './view-resources.page';

const routes: Routes = [
  {
    path: '',
    component: ViewResourcesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewResourcesPageRoutingModule {}
