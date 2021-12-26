import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleListenerComponent } from './components/title-listener/title-listener.component';

const routes: Routes = [
  { path: '', component: TitleListenerComponent, pathMatch: 'full' },
  { path: 'signature-info', redirectTo: 'contact/verify' },
  { path: 'signature-info.html', redirectTo: 'contact/verify' },
  { path: 'sites', loadChildren: () => import('./modules/content/content.module').then(m => m.ContentModule) },
  { path: 'contact', loadChildren: () => import('./modules/contact/contact.module').then(m => m.ContactModule) },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
