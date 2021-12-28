import { Component, OnDestroy, OnInit, Predicate } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { Message } from '../../interfaces/message';
import { ContactFormService } from '../../services/contact-form.service';
import { storeInputs } from '../../store/actions/contact-form.actions';
import { getContactFormInputs, isSending } from '../../store/selectors/contact-form.selectors';

@Component({
  selector: 'nwie-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  public contactForm: FormGroup = this.fb.group({
    subject: ['', Validators.required],
    fromName: ['', Validators.required],
    fromEmail: ['', [Validators.email, Validators.required]],
    requestEncryptedReply: [false, []],
    encryptionPassphrase: ['', [this.requiredIf(() => this.contactForm?.get('requestEncryptedReply')?.value && !this.hasSuitablePublicKey), Validators.minLength(8)]],
    message: ['', Validators.required],
    attachments: this.createAttachmentsArray(),
  });

  public attachmentFields!: FormArray;

  public sending = false;

  public get requestEncryptedReply(): boolean {
    return this.contactForm.get('requestEncryptedReply')?.value ?? false;
  }

  public hasSuitablePublicKey = false;

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private contactFormService: ContactFormService,
  ) { }

  ngOnInit(): void {
    this.listenToChanges();

    this.store.select(getContactFormInputs)
      .pipe(
        take(1)
      )
      .subscribe(values => {
        this.contactForm.setValue({ ...values, attachments: [null] });
      });

    this.store.select(isSending).pipe(
      takeUntil(this.destroy$)
    ).subscribe(s => this.sending = s);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }

  private createAttachmentsArray(): FormArray {
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
        takeUntil(this.destroy$),
      )
      .subscribe((val: Message) => {
        if (val.fromEmail && val.attachments) {
          this.contactFormService.checkForPublicKey(val.fromEmail, val.attachments)
            .subscribe(value => this.hasSuitablePublicKey = value);
        }

        this.contactForm.get('encryptionPassphrase')?.updateValueAndValidity();

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
      hasSuitablePublicKey: this.hasSuitablePublicKey
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
