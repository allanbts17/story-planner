import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ImagePasteAreaComponent } from './image-paste-area/image-paste-area.component';
import { StepperGuideComponent } from './stepper-guide/stepper-guide.component';
import { ViewSegmentComponent } from './view-segment/view-segment.component';
import { FixedElementComponent } from './fixed-element/fixed-element.component';
import { PlacePage } from '../pages/create/place/place.page';
import { PlaceFormComponent } from './place-form/place-form.component';
import { ObjectFormComponent } from './object-form/object-form.component';
import { CharacterFormComponent } from './character-form/character-form.component';

const components = [ HeaderComponent, TabsComponent,
   ResourceListComponent, ImagePasteAreaComponent, StepperGuideComponent, ViewSegmentComponent,
  FixedElementComponent, PlaceFormComponent, ObjectFormComponent, CharacterFormComponent ]

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
