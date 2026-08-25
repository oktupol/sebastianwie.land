import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OpenpgpAdapter {
  private http = inject(HttpClient);


  public getPublicKey(): Observable<string> {
    return this.http.get('/pgp-pubkey.asc', { responseType: 'text' });
  }
}
