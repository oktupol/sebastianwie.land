import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { GlobalMessagesService } from 'src/app/shared/services/global-messages.service';
import { MailAdapter } from '../../adapters/mail.adapter';
import { reset, send, sendFailure, sendSuccess } from '../actions/contact-form.actions';

@Injectable()
export class ContactFormEffects {
  send$ = createEffect(() => this.actions$.pipe(
    ofType(send),
    mergeMap(({encryptedMsg}) => this.mailAdapter.postMail(encryptedMsg).pipe(
      map(() => sendSuccess()),
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 413:
            this.gm.add({
              type: 'warn',
              message: 'The message you\'re trying to send is too big! Try reducing the attachment size to about 2.5MB.'
            });
            break;
          case 429:
            this.gm.add({
              type: 'warn',
              message: 'You have been sending a lot of messages through this form. Please wait a few hours before sending the next one.'
            });
            break;
          default:
            this.gm.add({
              type: 'error',
              message: 'An unknown error occurred while sending the message.'
            });
        }
        return of(sendFailure(error));
      })
    ))
  ));

  sendSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(sendSuccess),
    map(() => {
      this.gm.add({
        type: 'success',
        message: 'Message sent.'
      });
      this.router.navigate(['']);
      return reset();
    })
  ));

  constructor(
    private actions$: Actions,
    private mailAdapter: MailAdapter,
    private router: Router,
    private gm: GlobalMessagesService
  ) {}
}
