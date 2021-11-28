import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact.component';
import { ContentPageModule } from 'src/app/shared/components/content-page/content-page.module';
import { StoreModule } from '@ngrx/store';
import { FEATURE_MODULE, reducers } from './store/reducer';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ContentPageModule,
    StoreModule.forFeature(FEATURE_MODULE, reducers),
    ReactiveFormsModule
  ]
})
export class ContactModule { }
