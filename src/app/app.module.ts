import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ScullyLibModule } from '@scullyio/ng-lib';

@NgModule({
  declarations: [
    AppComponent,
    TitleWrapperComponent,
    TitleComponent,
    TitleListenerComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    ContentPageModule,
    ScullyLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
