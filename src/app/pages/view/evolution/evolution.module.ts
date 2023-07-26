import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvolutionPageRoutingModule } from './evolution-routing.module';

import { EvolutionPage } from './evolution.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { PlacePageModule } from '../../create/place/place.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
   // PlacePageModule,
    ReactiveFormsModule,
    EvolutionPageRoutingModule
  ],
  declarations: [EvolutionPage]
})
export class EvolutionPageModule {}
