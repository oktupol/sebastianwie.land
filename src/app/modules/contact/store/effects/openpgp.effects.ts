import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { GlobalMessagesService } from 'src/app/shared/services/global-messages.service';
import { OpenpgpAdapter } from '../../adapters/openpgp.adapter';
import { loadPublicKey, loadPublicKeyFailure, loadPublicKeySuccess } from '../actions/openpgp.actions';

@Injectable()
export class OpenpgpEffects {
  private actions$ = inject(Actions);
  private openpgpAdapter = inject(OpenpgpAdapter);
  private globalMessagesService = inject(GlobalMessagesService);

  loadPublicKey$ = createEffect(() => this.actions$.pipe(
    ofType(loadPublicKey),
    mergeMap(() => this.openpgpAdapter.getPublicKey().pipe(
      map(publicKey => loadPublicKeySuccess({ publicKey })),
      catchError(error => {
        this.globalMessagesService.add({
          type: 'error',
          message: 'There was an error while retrieving the encryption key. Please try again later.',
        });
        return of(loadPublicKeyFailure({ error }));
      })
    ))
  ));
}
