import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs';
import { Message } from '../interfaces/message';
import { send } from '../store/actions/contact-form.actions';
import { MultipartDocumentService } from './multipart-document.service';
import { OpenpgpService } from './openpgp.service';

@Injectable()
export class ContactFormService {
  public constructor(
    private openPgpService: OpenpgpService,
    private multipartDocumentService: MultipartDocumentService,
    private store: Store,
  ) { }

  public send(message: Message) {
    message = this.fillTemplate(message);

    this.multipartDocumentService.createMultipartDocument(message)
      .pipe(
        mergeMap(doc => this.openPgpService.encrypt(doc.toString()))
      )
      .subscribe((encrypted) => {
        this.store.dispatch(send({ encryptedMsg: encrypted as string }))
      });
  }

  private fillTemplate(message: Message): Message {
    const template = [
      `${message.fromName} sent a message through the contact from.`,
      `Date: ${new Date()}`,
      `Reply to: ${message.fromName} <${message.fromEmail}>`,
      ``,
      `Subject: ${message.subject}`,
      `--------------`,
      ``,
      message.message
    ].join('\n');

    return {
      ...message,
      message: template
    };
  }
}
