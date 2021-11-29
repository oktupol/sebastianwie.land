import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { debounceTime, Subject, take, takeUntil } from 'rxjs';
import { Message } from '../interfaces/message';
import { OpenpgpService } from '../services/openpgp.service';
import { reset, storeInputs } from '../store/actions/contact-form.actions';
import { getContactFormInputs } from '../store/selectors/contact-form.selectors';

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
  });

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private openpgpService: OpenpgpService
  ) { }

  ngOnInit(): void {
    this.listenToChanges();

    this.store.select(getContactFormInputs)
      .pipe(
        take(1)
      )
      .subscribe(values => {
        this.contactForm.setValue(values);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
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
    this.store.dispatch(reset());
  }

  public onSubmit(): void {
    this.openpgpService.encryptMessage(this.contactForm.value).subscribe(encrypted => {
      console.log(encrypted);
    });
  }
}
