import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MailAdapter {
  public constructor(private http: HttpClient) {}

  public postMail(message: string, messageId: string): Observable<string> {
    return this.http.post(environment.backendUrl + '/mail', message, {
      headers: {
        'X-Nwie-Message-Id': messageId
      },
      responseType: 'text'
    });
  }

}
