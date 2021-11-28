import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OpenpgpAdapter {
  public constructor(private http: HttpClient) {}

  public getPublicKey(): Observable<string> {
    return this.http.get('/pgp-pubkey.asc', { responseType: 'text' });
  }
}
