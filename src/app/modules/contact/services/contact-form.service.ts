import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../interfaces/message';
import { send } from '../store/actions/contact-form.actions';
import { EncodingService } from './encoding.service';
import { MultipartDocumentService } from './multipart-document.service';
import { OpenpgpService } from './openpgp.service';

@Injectable()
export class ContactFormService {
  public constructor(
    private openPgpService: OpenpgpService,
    private multipartDocumentService: MultipartDocumentService,
    private store: Store,
    private encodingService: EncodingService
  ) { }

  public send(message: Message) {
    message = this.fillTemplate(message);

    const messageId = this.encodingService.base32(
      crypto.getRandomValues(new Uint8Array(15))
    ) + '@' + environment.contact.messageIdDomain;

    this.multipartDocumentService.createMultipartDocument(message, messageId)
      .pipe(
        mergeMap(doc => this.openPgpService.encrypt(doc.toString()))
      )
      .subscribe((encrypted) => {
        this.store.dispatch(send({ encryptedMsg: encrypted as string, messageId }))
      });
  }

  private fillTemplate(message: Message): Message {
    const template = [
      `${message.fromName} <${message.fromEmail}> sent a message through the contact from.`,
      ``,
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
