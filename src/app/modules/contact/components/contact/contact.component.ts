import { Component, DestroyRef, OnInit, Predicate, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AbstractControl, UntypedFormArray, UntypedFormBuilder, UntypedFormGroup, ValidatorFn, Validators, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, take } from 'rxjs';
import { Message } from '../../interfaces/message';
import { ContactFormService } from '../../services/contact-form.service';
import { storeInputs } from '../../store/actions/contact-form.actions';
import { getContactFormInputs, isSending } from '../../store/selectors/contact-form.selectors';
import { ContentPageComponent } from '../../../../shared/components/content-page/content-page.component';
import { HelpComponent } from '../../../../shared/components/help/help.component';
import { AttachmentComponent } from '../attachment/attachment.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';

@Component({
    selector: 'nwie-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ContentPageComponent, ReactiveFormsModule, HelpComponent, AttachmentComponent, LoaderComponent]
})
export class ContactComponent implements OnInit {
  private fb = inject(UntypedFormBuilder);
  private store = inject(Store);
  private contactFormService = inject(ContactFormService);
  private destroyRef = inject(DestroyRef);

  public contactForm: UntypedFormGroup = this.fb.group({
    subject: ['', Validators.required],
    fromName: ['', Validators.required],
    fromEmail: ['', [Validators.email, Validators.required]],
    requestEncryptedReply: [false, []],
    encryptionPassphrase: ['', [this.requiredIf(() => this.contactForm?.get('requestEncryptedReply')?.value && !this.hasSuitablePublicKey()), Validators.minLength(8)]],
    message: ['', Validators.required],
    attachments: this.createAttachmentsArray(),
  });

  public attachmentFields!: UntypedFormArray;

  public readonly sending = this.store.selectSignal(isSending);

  public get requestEncryptedReply(): boolean {
    return this.contactForm.get('requestEncryptedReply')?.value ?? false;
  }

  public readonly hasSuitablePublicKey = signal(false);

  ngOnInit(): void {
    this.listenToChanges();

    this.store.select(getContactFormInputs)
      .pipe(
        take(1)
      )
      .subscribe(values => {
        this.contactForm.setValue({ ...values, attachments: [null] });
      });

  }

  private createAttachmentsArray(): UntypedFormArray {
    this.attachmentFields = this.fb.array([
      [null],
    ]);
    return this.attachmentFields;
  }

  public addAttachmentField(): void {
    this.attachmentFields.push(this.fb.control(null));
  }

  public deleteAttachment(index: number): void {
    this.attachmentFields.removeAt(index);
  }

  private listenToChanges(): void {
    this.contactForm.valueChanges
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((val: Message) => {
        if (val.fromEmail && val.attachments) {
          this.contactFormService.checkForPublicKey(val.fromEmail, val.attachments)
            .subscribe(value => this.hasSuitablePublicKey.set(value));
        }

        // emitEvent: false — this runs inside a valueChanges subscription, and
        // re-emitting would retrigger it through the debounce indefinitely.
        this.contactForm.get('encryptionPassphrase')?.updateValueAndValidity({ emitEvent: false });

        this.store.dispatch(storeInputs({
          subject: val.subject,
          fromName: val.fromName,
          fromEmail: val.fromEmail,
          requestEncryptedReply: val.requestEncryptedReply,
          encryptionPassphrase: val.encryptionPassphrase,
          message: val.message
        }));
      });
  }

  public reset(): void {
    this.contactForm.setControl('attachments', this.createAttachmentsArray());
  }

  public onSubmit(): void {
    this.contactFormService.send(this.contactForm.value, {
      hasSuitablePublicKey: this.hasSuitablePublicKey()
    });
  }

  private requiredIf(predicate: Predicate<void>): ValidatorFn {
    return (formControl: AbstractControl) => {
      if (predicate()) {
        return Validators.required(formControl);
      }
      return null;
    };
  }
}
