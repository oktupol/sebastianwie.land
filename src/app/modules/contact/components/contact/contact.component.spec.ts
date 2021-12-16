import { DebugElement, Injectable } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { EMPTY, Observable, of } from 'rxjs';
import { Message } from '../../interfaces/message';
import { ContactFormService } from '../../services/contact-form.service';
import { getContactFormInputs } from '../../store/selectors/contact-form.selectors';

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
class MockContactFormService {
  send() {

  }
}
describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let el: DebugElement;
  let contactFormService: ContactFormService;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Store, useClass: MockStore },
        { provide: ContactFormService, useClass: MockContactFormService },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    el = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.inject(Store);
    contactFormService = TestBed.inject(ContactFormService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('attachments', () => {
    let attachments: FormArray;

    beforeEach(() => {
      attachments = component.contactForm.get('attachments') as FormArray;
    });

    describe('addAttachmentField', () => {
      it('should increase number of attachments', () => {
        expect(attachments.length).toBe(1);

        component.addAttachmentField();

        expect(attachments.length).toBe(2);
      });
    });

    describe('deleteAttachment', () => {
      it('should reduce number of attachments', () => {
        component.addAttachmentField();
        component.addAttachmentField();

        expect(attachments.length).toBe(3);

        component.deleteAttachment(0);

        expect(attachments.length).toBe(2);
      });
    });

    describe('reset', () => {
      it('should reset attachment array', () => {
        component.addAttachmentField();
        component.addAttachmentField();
        component.addAttachmentField();

        expect(attachments.length).toBe(4);

        component.reset();

        expect(component.contactForm.get('attachments')).not.toBe(attachments);

        expect((component.contactForm.get('attachments') as FormArray).length).toBe(1);
      });
    });
  });

});
