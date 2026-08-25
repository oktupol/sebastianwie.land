import { HttpClient } from '@angular/common/http';
import { Routes } from '@angular/router';
import { provideMarkdown } from 'ngx-markdown';
import { ImprintComponent } from './components/imprint/imprint.component';
import { MarkdownComponent } from './components/markdown/markdown.component';

export const contentRoutes: Routes = [
  {
    path: '',
    providers: [
      provideMarkdown({ loader: HttpClient }),
    ],
    children: [
      { path: 'about', component: MarkdownComponent, data: {
        markdownFile: '/assets/content/about.md'
      }},
      { path: 'exporting-emails', component: MarkdownComponent, data: {
        markdownFile: '/assets/content/exporting-emails.md'
      }},
      { path: 'imprint', component: ImprintComponent },
      { path: 'pgp', component: MarkdownComponent, data: {
        markdownFile: '/assets/content/pgp.md'
      }},
    ],
  },
];
