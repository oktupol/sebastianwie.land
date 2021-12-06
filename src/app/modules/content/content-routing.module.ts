import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImprintComponent } from './components/imprint/imprint.component';
import { MarkdownComponent } from './components/markdown/markdown.component';

const routes: Routes = [
  { path: 'about', component: MarkdownComponent, data: {
    markdownFile: '/assets/content/about.md'
  }},
  { path: 'openpgp', component: MarkdownComponent, data: {
    markdownFile: '/assets/content/openpgp.md'
  }},
  { path: 'imprint', component: ImprintComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
