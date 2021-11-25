import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenpgpComponent } from './components/openpgp/openpgp.component';
import { ContentComponent } from './content.component';

const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'openpgp', component: OpenpgpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
