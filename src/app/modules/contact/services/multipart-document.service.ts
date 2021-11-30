import { Injectable } from '@angular/core';
import { MimeDocumentFactory, MultipartDocumentFactory } from '../factories/multipart-document.factory';
import { EncodingService } from './encoding.service';

@Injectable()
export class MultipartDocumentService {
  constructor(private encodingService: EncodingService){}

  public multipartDocumentFactory(): MultipartDocumentFactory {
    return new MultipartDocumentFactory(this.encodingService);
  }

  public mimeDocumentFactory(): MimeDocumentFactory {
    return new MimeDocumentFactory();
  }
}
