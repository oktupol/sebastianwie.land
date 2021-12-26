import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class FileService {
  public readFileContentsAsArrayBuffer(file: File): Observable<ArrayBuffer> {
    return this.readFileContents(file, 'arraybuffer') as Observable<ArrayBuffer>;
  }

  public readFileContentsAsString(file: File): Observable<string> {
    return this.readFileContents(file, 'string') as Observable<string>;
  }

  private readFileContents(file: File, outputAs: 'string' | 'arraybuffer'): Observable<string | ArrayBuffer> {
    return new Observable(subscriber => {
      if (!file) {
        subscriber.error('Parameter file must be given');
        subscriber.complete();
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        if ((reader.result instanceof ArrayBuffer && outputAs === 'arraybuffer')
          || (typeof reader.result === 'string' && outputAs === 'string')) {
          subscriber.next(reader.result);
          subscriber.complete();
        } else {
          subscriber.error(`While reading ${file.name}, expected ${outputAs}. Got ${typeof reader.result}`);
          subscriber.complete();
        }
      };

      reader.onerror = () => {
        subscriber.error(`Error occurred during reading file ${file.name}`);
        subscriber.complete();
      }

      switch(outputAs) {
        case 'string':
          reader.readAsText(file);
          break;
        case 'arraybuffer':
          reader.readAsArrayBuffer(file);
          break;
        default:
          throw new Error(`Invalid value for parameter outputAs: ${outputAs}`);
      }
    })
  }
}
