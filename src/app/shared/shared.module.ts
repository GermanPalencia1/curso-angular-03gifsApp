import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  //Acordarse de exportarlo para poder usarlo en el módulo principal
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
