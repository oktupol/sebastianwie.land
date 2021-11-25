import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentPageComponent } from './content-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ContentPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ContentPageComponent
  ]
})
export class ContentPageModule { }
