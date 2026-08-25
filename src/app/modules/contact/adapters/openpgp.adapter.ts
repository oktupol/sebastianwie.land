import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

@Service({ autoProvided: false })
export class OpenpgpAdapter {
  private http = inject(HttpClient);


  public getPublicKey(): Observable<string> {
    return this.http.get('/pgp-pubkey.asc', { responseType: 'text' });
  }
}
