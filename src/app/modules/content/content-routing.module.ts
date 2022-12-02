import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintComponent } from './components/imprint/imprint.component';
import { MarkdownComponent } from './components/markdown/markdown.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
