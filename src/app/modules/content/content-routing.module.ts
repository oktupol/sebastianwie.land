import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarkdownComponent } from './components/markdown/markdown.component';

const routes: Routes = [
  { path: 'openpgp', component: MarkdownComponent, data: {
    markdownFile: '/assets/content/openpgp.md'
  }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
