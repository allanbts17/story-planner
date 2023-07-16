import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'folder/:id',
  //   loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  // },
  {
    path: 'home/:id',
    loadChildren: () => import('./pages/general/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'story/:id',
    loadChildren: () => import('./pages/create/story/story.module').then( m => m.StoryPageModule)
  },
  {
    path: 'series/:id',
    loadChildren: () => import('./pages/create/series/series.module').then( m => m.SeriesPageModule)
  },
  {
    path: 'place/:id',
    loadChildren: () => import('./pages/create/place/place.module').then( m => m.PlacePageModule)
  },
  {
    path: 'object/:id',
    loadChildren: () => import('./pages/create/object/object.module').then( m => m.ObjectPageModule)
  },
  {
    path: 'view-resources/:id',
    loadChildren: () => import('./pages/view/view-resources/view-resources.module').then( m => m.ViewResourcesPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
