import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleWrapperComponent } from './components/title-wrapper/title-wrapper.component';
import { TitleComponent } from './components/title/title.component';
import { TitleListenerComponent } from './components/title-listener/title-listener.component';
import { reducers, metaReducers } from './store/reducers';
import { environment } from 'src/environments/environment';
import { ContentPageModule } from './shared/components/content-page/content-page.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TitleEffects } from './store/effects/title.effects';
import { EffectsModule } from '@ngrx/effects';
import { GlobalMessagesService } from './shared/services/global-messages.service';
import { GlobalMessagesComponent } from './components/global-messages/global-messages.component';
import { WINDOW } from './util/injection-tokens';
import { DOCUMENT } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    TitleWrapperComponent,
    TitleComponent,
    TitleListenerComponent,
    NotFoundComponent,
    NavigationComponent,
    GlobalMessagesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([TitleEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    connectInZone: true}),
    ContentPageModule,
  ],
  providers: [
    // Resolved via DOCUMENT so the module can also be evaluated during
    // prerendering, where `window` does not exist.
    { provide: WINDOW, useFactory: (doc: Document) => doc.defaultView, deps: [DOCUMENT] },
    GlobalMessagesService,
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
