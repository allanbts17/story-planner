import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObjectPageRoutingModule } from './object-routing.module';

import { ObjectPage } from './object.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    ObjectPageRoutingModule
  ],
  declarations: [ObjectPage]
})
export class ObjectPageModule {}
