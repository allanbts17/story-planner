import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewResourcesPageRoutingModule } from './view-resources-routing.module';

import { ViewResourcesPage } from './view-resources.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ViewResourcesPageRoutingModule
  ],
  declarations: [ViewResourcesPage]
})
export class ViewResourcesPageModule {}
