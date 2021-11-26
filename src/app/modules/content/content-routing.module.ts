import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpenpgpComponent } from './components/openpgp/openpgp.component';

const routes: Routes = [
  { path: 'openpgp', component: OpenpgpComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentRoutingModule { }
