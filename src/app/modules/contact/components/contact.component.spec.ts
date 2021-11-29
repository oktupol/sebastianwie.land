import { Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { Message } from '../interfaces/message';
import { OpenpgpService } from '../services/openpgp.service';
import { getContactFormInputs } from '../store/selectors/contact-form.selectors';

import { ContactComponent } from './contact.component';

@Injectable()
class MockStore {
  select(selector: any) {
    if (selector === getContactFormInputs) {
      return of({
        subject: 'Subject',
        fromName: 'Someone',
        fromEmail: 'name@email.com',
        message: 'Message'
      } as Message);
    }

    return EMPTY;
  }
  dispatch() {
  }
}
@Injectable()
class MockOpenPgpService {
  encryptMessage(message: Message): Observable<Message> {
    return of({ ...message, message: '3ncryp73d m355463'});
  }
}
describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ],
      imports: [ ReactiveFormsModule ],
      providers: [
        FormBuilder,
        { provide: Store, useClass: MockStore },
        { provide: OpenpgpService, useClass: MockOpenPgpService },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
