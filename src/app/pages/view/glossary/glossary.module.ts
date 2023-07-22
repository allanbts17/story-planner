import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GlossaryPageRoutingModule } from './glossary-routing.module';

import { GlossaryPage } from './glossary.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    ReactiveFormsModule,
    GlossaryPageRoutingModule
  ],
  declarations: [GlossaryPage]
})
export class GlossaryPageModule {}
