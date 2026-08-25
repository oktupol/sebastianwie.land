import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { MailAdapter } from './adapters/mail.adapter';
import { OpenpgpAdapter } from './adapters/openpgp.adapter';
import { ContactComponent } from './components/contact/contact.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ContactFormService } from './services/contact-form.service';
import { EncodingService } from './services/encoding.service';
import { FileService } from './services/file.service';
import { MultipartDocumentService } from './services/multipart-document.service';
import { OpenpgpService } from './services/openpgp.service';
import { VerificationService } from './services/verification.service';
import { ContactFormEffects } from './store/effects/contact-form.effects';
import { OpenpgpEffects } from './store/effects/openpgp.effects';
import { FEATURE_MODULE, reducers } from './store/reducer';

export const contactRoutes: Routes = [
  {
    path: '',
    providers: [
      provideState(FEATURE_MODULE, reducers),
      provideEffects(OpenpgpEffects, ContactFormEffects),
      OpenpgpAdapter,
      MailAdapter,
      OpenpgpService,
      EncodingService,
      MultipartDocumentService,
      ContactFormService,
      FileService,
      VerificationService,
    ],
    children: [
      { path: '', component: ContactComponent },
      { path: 'verify', component: VerifyEmailComponent },
    ],
  },
];
