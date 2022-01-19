import { Injectable } from '@angular/core';
import { catchError, from, map, mergeMap, Observable, of } from 'rxjs';
import { VerificationResponse } from 'src/app/util/types';
import { environment } from 'src/environments/environment';
import { ContentType, Email, Headers } from '../interfaces/email';
import { FileService } from './file.service';
import { OpenpgpService } from './openpgp.service';

@Injectable()
export class VerificationService {
  constructor(
    private fileService: FileService,
    private openPgpService: OpenpgpService
  ) {}


  public verify(file: File): Observable<VerificationResponse> {
    if (file.type !== 'message/rfc822') {
      return of('not-an-eml-file');
    }

    return this.fileService.readFileContentsAsString(file).pipe(
      map(content => content.trim()),
      map(content => this.parseEmail(content)),
      mergeMap((email: Email): Observable<VerificationResponse> => {
        const fromParts = email.headers['from'].match(/^([^<]*<)?([^<]*@[^>]*).*$/);
        if (fromParts && fromParts[2] !== environment.contact.senderVerificationAddress) {
          return of('not-from-me');
        }

        if (email.headers['x-pm-origin'] === 'internal' && email.headers['x-pm-content-encryption'] === 'end-to-end') {
          return of('protonmail');
        }

        if (!email.isMultipart) {
          return of('not-a-multipart-file');
        }

        if (email.contentType.type === 'multipart/encrypted') {
          return of('encrypted');
        }

        if (email.contentType.type !== 'multipart/signed' || email.contentType.params?.['protocol'] !== 'application/pgp-signature') {
          return of('no-signature-present');
        }

        if (!email.parts || email.parts.length < 2 || email.parts[1].parsed.contentType.type !== 'application/pgp-signature') {
          return of('no-signature-present');
        }

        const message = email.parts[0].raw.replace(/\r?\n/g, '\r\n');
        const signature = email.parts[1].parsed.content;

        return this.openPgpService.verify(message, signature).pipe(
          mergeMap(result => from(result.signatures[0].verified)),
          map(verified => verified ? 'good-signature' : 'bad-signature'),
          catchError((): Observable<VerificationResponse> => of('bad-signature'))
        );
      })
    );
  }

  private parseEmail(str: string): Email {
    str = str.trim();
    const lines = str.split(/\r?\n/);

    const headers: Headers = {};

    let i;
    for (i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '') {
        // End of headers
        break;
      }

      const headerFields = line.match(/^([^:]*):(.*)$/);
      if (headerFields) {
        headers[headerFields[1].trim().toLowerCase()] = headerFields[2].trim();
      }
    }

    // Advance i to next non-empty line
    while (!lines[++i].trim());

    const contentLines = lines.splice(i);
    const content = contentLines.join('\n');
    const contentType = this.parseContentType(headers['content-type']);

    if (!contentType.type.startsWith('multipart/')) {
      return {
        headers,
        content,
        contentType,
        isMultipart: false
      };
    } else {
      const boundary = contentType.params?.['boundary'];

      if (!boundary) {
        return {
          headers,
          content,
          contentType,
          isMultipart: true
        };
      }

      const parts: string[] = [];

      let part: string[] = [];
      let partIndex = -1;
      for (let i = 0; i < contentLines.length; i++) {
        const line = contentLines[i];
        const trimmedLine = line.trim();

        if (trimmedLine === `--${boundary}` || trimmedLine === `--${boundary}--`) {
          partIndex++;

          if (partIndex > 0) {
            parts.push(part.join('\n'));
            part = [];
          }

          if (trimmedLine === `--${boundary}--`) {
            break;
          }
        } else if (partIndex >= 0) {
          part.push(line);
        }
      }

      return {
        headers,
        content,
        contentType,
        parts: parts.map(part => ({ parsed: this.parseEmail(part), raw: part })),
        isMultipart: true
      };
    }
  }

  private parseContentType(contentType: string): ContentType {
    const parts = contentType.split(';').map(s => s.trim());

    if (parts.length === 1) {
      return {
        type: parts[0]
      };
    }

    const params: { [name: string]: string }= {};

    for (let i = 1; i < parts.length; i++) {
      const paramFields = parts[i].match(/^(\w+)=("?)(.*?)(\2)$/);

      if (paramFields) {
        params[paramFields[1].trim()] = paramFields[3].trim();
      }
    }

    return {
      type: parts[0],
      params
    };
  }
}

