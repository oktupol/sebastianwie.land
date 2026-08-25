import { ApplicationConfig, DOCUMENT, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { routes } from './app.routes';
import { GlobalMessagesService } from './shared/services/global-messages.service';
import { TitleEffects } from './store/effects/title.effects';
import { metaReducers, reducers } from './store/reducers';
import { WINDOW } from './util/injection-tokens';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection(),
    provideRouter(routes),
    provideHttpClient(),
    provideClientHydration(),
    provideStore(reducers, { metaReducers }),
    provideEffects(TitleEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: environment.production,
      connectInZone: true,
    }),
    // Resolved via DOCUMENT so the app can also be bootstrapped while
    // prerendering, where `window` does not exist.
    { provide: WINDOW, useFactory: (doc: Document) => doc.defaultView, deps: [DOCUMENT] },
    GlobalMessagesService,
  ],
};
