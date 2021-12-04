import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { Message } from '../../interfaces/message';
import { ContactFormService } from '../../services/contact-form.service';
import { storeInputs } from '../../store/actions/contact-form.actions';
import { getContactFormInputs } from '../../store/selectors/contact-form.selectors';

@Component({
  selector: 'nwie-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {
  public contactForm = this.fb.group({
    subject: ['', Validators.required],
    fromName: ['', Validators.required],
    fromEmail: ['', [Validators.email, Validators.required]],
    message: ['', Validators.required],
    attachments: this.createAttachmentsArray(),
  });

  public attachmentFields!: FormArray;

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
        takeUntil(this.destroy$),
        debounceTime(300)
      )
      .subscribe((val: Message) => {
        this.store.dispatch(storeInputs({
          subject: val.subject,
          fromName: val.fromName,
          fromEmail: val.fromEmail,
          message: val.message
        }));
      });
  }

  public reset(): void {
    this.contactForm.setControl('attachments', this.createAttachmentsArray());
  }

  public onSubmit(): void {
    this.contactFormService.send(this.contactForm.value);
  }
}