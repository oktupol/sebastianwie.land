import { Injectable } from '@angular/core';


export enum Base32Charset {
  DEFAULT   = 'abcdefghijklmnopqrstuvwxyz234567',
  Z         = 'ybndrfg8ejkmcpqxot1uwisza345h769',
  CROCKFORD = '0123456789ABCDEFGHJKMNPQRSTVWXYZ',
  WORD_SAFE = '23456789CFGHJMPQRVWXcfghjmpqrvwx',
}

export enum Base64Charset {
  DEFAULT = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
}

@Injectable()
export class EncodingService {
  base32(buffer: ArrayBuffer | Uint8Array, chars: Base32Charset = Base32Charset.DEFAULT): string {
    const bytes = (buffer instanceof ArrayBuffer) ? new Uint8Array(buffer) : buffer;
    let result = '';

    for(let i = 0; i < bytes.length; i += 5) {
      result += chars[ bytes[i] >> 3 ];
      result += chars[ ((bytes[i] & 7) << 2) | (bytes[i + 1] >> 6) ];
      result += chars[ (bytes[i + 1] & 63) >> 1 ];
      result += chars[ ((bytes[i + 1] & 1) << 4) | (bytes[i + 2] >> 4) ];
      result += chars[ ((bytes[i + 2] & 15) << 1) | (bytes[i + 3] >> 7) ];
      result += chars[ (bytes[i + 3] & 127) >> 2 ];
      result += chars[ ((bytes[i + 3] & 3) << 3) | (bytes[i + 4] >> 5) ];
      result += chars[ bytes[i + 4] & 31 ];
    }

    const cutoff = (8 - Math.ceil((bytes.length % 5) / 5 * 8)) % 8;
    return result.substring(0, result.length - cutoff);
  }

  base64(buffer: ArrayBuffer | Uint8Array, chars: Base64Charset = Base64Charset.DEFAULT): string {
    const bytes = (buffer instanceof ArrayBuffer) ? new Uint8Array(buffer) : buffer;
    let result = '';

    for (let i = 0; i < bytes.length; i += 3) {
      result += chars[ bytes[i] >> 2 ];
      result += chars[ ((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4) ];
      result += chars[ ((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6) ];
      result += chars[ bytes[i + 2] & 63 ];
    }

    if (bytes.length % 3 === 2) {
      result = result.substring(0, result.length - 1) + '=';
    } else if (bytes.length % 3 === 1) {
      result = result.substring(0, result.length - 2) + '==';
    }

    return result;
  }

  wrap(str: string): string {
    return str.replace(/(?![^\n]{1,76}$)([^\n]{1,76})/g, '$1\n');
  }
}
