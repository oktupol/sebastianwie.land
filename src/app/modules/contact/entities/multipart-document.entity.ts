export interface AbstractDocument {
  contentType: string;
  toString(): string;
}

export class MultipartDocument implements AbstractDocument {
  constructor(
    public contentType: string,
    public boundary: string,
    public protectedHeaders: boolean,
  ) {}

  public parts: AbstractDocument[] = [];
  public headers: string[] = [];

  toString(): string {
    const result = [];
    const boundaryLeftPadded = this.boundary.padStart(50, '-');

    if (!this.protectedHeaders) {
      result.push(`Content-Type: ${this.contentType};boundary=${boundaryLeftPadded}`);
    } else {
      result.push(`Content-Type: ${this.contentType};boundary=${boundaryLeftPadded};protected-headers="v1"`);
      for (let header of this.headers) {
        result.push(header);
      }
    }
    result.push('');

    for(let part of this.parts) {
      result.push(`--${boundaryLeftPadded}`);
      result.push(part.toString());
    }
    result.push(`--${boundaryLeftPadded}--`);

    return result.join('\n');
  }
}

export class MimeDocument implements AbstractDocument {
  constructor(
    public contentType: string,
    public contentTransferEncoding: string,
    public content: string,
    public isAttachment: boolean = false,
    public filename?: string,
    public name?: string
  ) {}

  toString() {
    const result = [];

    result.push(`Content-Type: ${this.contentType}`);
    result.push(`Content-Transfer-Encoding: ${this.contentTransferEncoding}`);

    if (this.isAttachment) {
      result.push(`Content-Disposition: attachment; filename="${this.filename}"; name="${this.name}"`);
    }

    result.push('');
    result.push(this.content);

    return result.join('\n');
  }
}
