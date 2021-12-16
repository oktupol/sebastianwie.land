import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { VerifyMailComponent } from './components/verify-mail/verify-mail.component';

const routes: Routes = [
  { path: '', component: ContactComponent },
  { path: 'verify', component: VerifyMailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
