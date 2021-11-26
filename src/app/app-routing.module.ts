import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleListenerComponent } from './components/title-listener/title-listener.component';

const routes: Routes = [
  { path: '', component: TitleListenerComponent, pathMatch: 'full' },
  { path: 'signature-info', redirectTo: 'sites/openpgp' },
  { path: 'signature-info.html', redirectTo: 'sites/openpgp' },
  { path: 'sites', loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }