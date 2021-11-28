import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact.component';
import { ContentPageModule } from 'src/app/shared/components/content-page/content-page.module';
import { StoreModule } from '@ngrx/store';
import { FEATURE_MODULE, reducers } from './store/reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { OpenpgpEffects } from './store/effects/openpgp.effects';
import { OpenpgpAdapter } from './adapters/openpgp.adapter';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    ContactComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ContentPageModule,
    StoreModule.forFeature(FEATURE_MODULE, reducers),
    EffectsModule.forFeature([ OpenpgpEffects ]),
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    OpenpgpAdapter
  ]
})
export class ContactModule { }
