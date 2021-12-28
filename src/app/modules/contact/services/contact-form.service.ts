import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { mergeMap, of, throwError } from 'rxjs';
import { GlobalMessagesService } from 'src/app/shared/services/global-messages.service';
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
    private encodingService: EncodingService,
    private gm: GlobalMessagesService
  ) { }

  public send(message: Message) {
    message = this.fillTemplate(message);

    if (this.messageIsTooLarge(message)) {
      this.gm.add({
        type: 'warn',
        message: 'The message you\'re trying to send is too large. Try keeping it and the total size of the attachments below 2.5MB.'
      });
      return;
    }

    const messageId = this.encodingService.base32(
      crypto.getRandomValues(new Uint8Array(15))
    ) + '@' + environment.contact.messageIdDomain;

    this.multipartDocumentService.createMultipartDocument(message, messageId)
      .pipe(
        mergeMap(doc => this.openPgpService.encrypt(doc.toString())),
        mergeMap(encrypted => {
          if ((encrypted as string).length <= environment.contact.maxEncryptedMessageSize) {
            return of(encrypted);
          } else {
            this.gm.add({
              type: 'error',
              message: 'The message you\'re trying to send is too large. Try reducing the size of the attachments.'
            })
            return throwError(() => new Error('Encrypted file size is too large'))
          }
        })
      )
      .subscribe((encrypted) => {
        this.store.dispatch(send({ encryptedMsg: encrypted as string, messageId }))
      });
  }

  private fillTemplate(message: Message): Message {
    const template: string[] = [ `${message.fromName} <${message.fromEmail}> sent a message through the contact from.` ];

    if (message.requestEncryptedReply && message.encryptionPassphrase) {
      template.push(`Encrypted reply requested with passphrase "${message.encryptionPassphrase}"`);
    }

    template.push(``, `--------------`, ``, message.message);

    return {
      ...message,
      message: template.join('\n')
    };
  }

  private messageIsTooLarge(message: Message): boolean {
    let totalSize = message.message.length;
    if (message.attachments) {
      for(let attachment of message.attachments) {
        if (attachment) {
          totalSize += attachment.size;
        }
      }
    }

    return totalSize > environment.contact.maxMessageSize;
  }
}
