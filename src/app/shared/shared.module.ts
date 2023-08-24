import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    LazyImageComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  //Acordarse de exportarlo para poder usarlo en el módulo principal
  exports: [
    LazyImageComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
