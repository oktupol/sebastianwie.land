import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { MarkdownComponent } from './components/markdown/markdown.component';
import { ContentPageModule } from 'src/app/shared/components/content-page/content-page.module';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImprintComponent } from './components/imprint/imprint.component';


@NgModule({
  declarations: [
    MarkdownComponent,
    ImprintComponent,
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    ContentPageModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ]
})
export class ContentModule { }
