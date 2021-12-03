import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { MailAdapter } from '../../adapters/mail.adapter';
import { reset, send, sendFailure, sendSuccess } from '../actions/contact-form.actions';

@Injectable()
export class ContactFormEffects {
  send$ = createEffect(() => this.actions$.pipe(
    ofType(send),
    mergeMap(({encryptedMsg}) => this.mailAdapter.postMail(encryptedMsg).pipe(
      map(() => sendSuccess()),
      catchError((error: HttpErrorResponse) => of(sendFailure(error)))
    ))
  ));

  sendSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(sendSuccess),
    map(() => {
      this.router.navigate(['']);
      return reset();
    })
  ));

  constructor(
    private actions$: Actions,
    private mailAdapter: MailAdapter,
    private router: Router
  ) {}
}
