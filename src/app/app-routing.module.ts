import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TitleListenerComponent } from './components/title-listener/title-listener.component';

const routes: Routes = [
  { path: '', component: TitleListenerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
