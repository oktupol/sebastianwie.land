import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createMessage, encrypt, NodeStream, readKey, readSignature, verify, VerifyMessageResult, WebStream } from 'openpgp';
import { EMPTY, filter, from,  mergeMap, Observable, of, take, takeUntil, withLatestFrom, } from 'rxjs';
import { loadPublicKey } from '../store/actions/openpgp.actions';
import { getError, getPublicKey } from '../store/selectors/openpgp.selectors';

@Injectable()
export class OpenpgpService {
  public constructor(private store: Store) { }

  public getOpenpgpKey(): Observable<string> {
    return this.store.select(getPublicKey)
      .pipe(
        mergeMap((key) => {
          if (this.isString(key)) {
            return of(key);
          }

          this.store.dispatch(loadPublicKey());
          return EMPTY;
        }),
        takeUntil(this.store.select(getError).pipe(filter(error => error))),
        take(1),
      );
  }

  public encrypt(text: string): Observable<string | WebStream<string> | NodeStream<string>> {
    return this.getOpenpgpKey().pipe(
      mergeMap(key => from(readKey({ armoredKey: key }))),
      withLatestFrom(from(createMessage({ text: text }))),
      mergeMap(([key, message]) => from(encrypt({ message, encryptionKeys: key }))),
    );
  }

  public verify(text: string, signature: string): Observable<VerifyMessageResult & { data: string }> {
    return this.getOpenpgpKey().pipe(
      mergeMap(key => from(readKey({ armoredKey: key }))),
      withLatestFrom(from(createMessage({ text: text }))),
      withLatestFrom(from(readSignature({ armoredSignature: signature }))),
      mergeMap(([[key, message], signature]) => from(verify({ message, signature, verificationKeys: key })))
    );
  }

  private isString(str: any): str is string {
    return typeof str === 'string';
  }
}
