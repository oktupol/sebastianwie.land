import { Component, DebugElement, ChangeDetectionStrategy, input, output, Service } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, ReactiveFormsModule } from '@angular/forms';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Message } from '../../interfaces/message';
import { ContactFormService } from '../../services/contact-form.service';
import { EncodingService } from '../../services/encoding.service';
import { getContactFormInputs, isSending } from '../../store/selectors/contact-form.selectors';

import { ContactComponent } from './contact.component';

@Service({ autoProvided: false })
class MockContactFormService {
  send() {

  }
}

@Component({
    selector: 'nwie-content-page', template: '<p><ng-content /></p>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule]
})
class MockContentPageComponent {
}
@Component({
    selector: 'nwie-loader', template: 'loading...',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule]
})
class MockLoaderComponent {
}
@Component({
    selector: 'nwie-attachment', template: '<div>attachment</div>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ReactiveFormsModule]
})
class MockAttachmentComponent {
  public readonly control = input.required<UntypedFormControl>();
  public readonly addAttachment = output<void>();
  public readonly delete = output<void>();
}
describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let el: DebugElement;
  let contactFormService: ContactFormService;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ReactiveFormsModule, ContactComponent, MockContentPageComponent, MockLoaderComponent, MockAttachmentComponent],
    providers: [
        EncodingService,
        UntypedFormBuilder,
        provideMockStore({
            initialState: { navigation: { open: false } },
            selectors: [
                { selector: getContactFormInputs, value: {
                    subject: 'Subject',
                    fromName: 'Someone',
                    fromEmail: 'name@email.com',
                    message: 'Message',
                } },
                { selector: isSending, value: false },
            ],
        }),
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

    store = TestBed.inject(MockStore);
    contactFormService = TestBed.inject(ContactFormService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('attachments', () => {
    let attachments: UntypedFormArray;

    beforeEach(() => {
      attachments = component.contactForm.get('attachments') as UntypedFormArray;
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

        expect((component.contactForm.get('attachments') as UntypedFormArray).length).toBe(1);
      });
    });
  });

});
