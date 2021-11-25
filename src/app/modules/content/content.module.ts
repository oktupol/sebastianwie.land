import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { OpenpgpComponent } from './components/openpgp/openpgp.component';
import { ContentPageModule } from 'src/app/shared/components/content-page/content-page.module';


@NgModule({
  declarations: [
    ContentComponent,
    OpenpgpComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ContentPageModule
  ]
})
export class ContentModule { }
