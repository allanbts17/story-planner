import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvolutionPage } from './evolution.page';

const routes: Routes = [
  {
    path: '',
    component: EvolutionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvolutionPageRoutingModule {}
