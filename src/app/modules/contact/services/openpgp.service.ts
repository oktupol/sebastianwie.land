import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createMessage, encrypt, readKey } from 'openpgp';
import { EMPTY, filter, from, map, mergeMap, Observable, of, take, takeUntil, withLatestFrom, } from 'rxjs';
import { Message } from '../interfaces/message';
import { loadPublicKey } from '../store/actions/openpgp.actions';
import { getError, getPublicKey } from '../store/selectors/openpgp.selectors';

@Injectable()
export class OpenpgpService {
  public constructor(private store: Store) {}

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
        takeUntil(this.store.select(getError).pipe(
          take(1),
          filter(error => error !== null)
        )),
        take(1),
      );
  }

  public encrypt(msg: Message): Observable<Message> {
    return this.getOpenpgpKey().pipe(
      mergeMap(key => from(readKey({ armoredKey: key }))),
      withLatestFrom(from(createMessage({ text: msg.message }))),
      mergeMap(([key, message]) => from(encrypt({ message, encryptionKeys: key }))),
      map(encrypted => ({ ...msg, message: encrypted })),
    );
  }

  private isString(str: any): str is string {
    return typeof str === 'string';
  }
}
