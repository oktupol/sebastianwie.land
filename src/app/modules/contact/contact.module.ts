import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact/contact.component';
import { ContentPageModule } from 'src/app/shared/components/content-page/content-page.module';
import { StoreModule } from '@ngrx/store';
import { FEATURE_MODULE, reducers } from './store/reducer';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { OpenpgpEffects } from './store/effects/openpgp.effects';
import { OpenpgpAdapter } from './adapters/openpgp.adapter';
import { HttpClientModule } from '@angular/common/http';
import { OpenpgpService } from './services/openpgp.service';
import { EncodingService } from './services/encoding.service';
import { MultipartDocumentService } from './services/multipart-document.service';
import { AttachmentComponent } from './components/attachment/attachment.component';
import { MailAdapter } from './adapters/mail.adapter';
import { ContactFormService } from './services/contact-form.service';
import { ContactFormEffects } from './store/effects/contact-form.effects';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { FileService } from './services/file.service';
import { VerificationService } from './services/verification.service';
import { HelpModule } from 'src/app/shared/components/help/help.module';

@NgModule({
  declarations: [
    ContactComponent,
    AttachmentComponent,
    VerifyEmailComponent
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    ContentPageModule,
    StoreModule.forFeature(FEATURE_MODULE, reducers),
    EffectsModule.forFeature([ OpenpgpEffects, ContactFormEffects ]),
    ReactiveFormsModule,
    HttpClientModule,
    LoaderModule,
    HelpModule,
  ],
  providers: [
    OpenpgpAdapter,
    MailAdapter,
    OpenpgpService,
    EncodingService,
    MultipartDocumentService,
    ContactFormService,
    FileService,
    VerificationService,
  ]
})
export class ContactModule { }
