import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { TabsComponent } from './tabs/tabs.component';
import { ResourceListComponent } from './resource-list/resource-list.component';
import { ImagePasteAreaComponent } from './image-paste-area/image-paste-area.component';

const components = [ HeaderComponent, TabsComponent, ResourceListComponent, ImagePasteAreaComponent ]

@NgModule({
  declarations: [components],
  exports: [components],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
