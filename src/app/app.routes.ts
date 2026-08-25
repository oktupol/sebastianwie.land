import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TitleListenerComponent } from './components/title-listener/title-listener.component';

export const routes: Routes = [
  { path: '', component: TitleListenerComponent, pathMatch: 'full' },
  { path: 'signature-info', redirectTo: 'contact/verify' },
  { path: 'signature-info.html', redirectTo: 'contact/verify' },
  { path: 'sites', loadChildren: () => import('./modules/content/content.routes').then(m => m.contentRoutes) },
  { path: 'contact', loadChildren: () => import('./modules/contact/contact.routes').then(m => m.contactRoutes) },
  { path: '**', component: NotFoundComponent },
];
