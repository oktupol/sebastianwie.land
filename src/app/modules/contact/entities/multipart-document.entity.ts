export interface AbstractDocument {
  contentType: string;
  toString(): string;
}

export class MultipartDocument implements AbstractDocument {
  constructor(
    public contentType: string,
    public boundary: string,
  ) {}

  public parts: AbstractDocument[] = [];

  toString(): string {
    const result = [];
    const boundaryLeftPadded = this.boundary.padStart(52, '-');

    result.push(`Content-Type: ${this.contentType};boundary=${boundaryLeftPadded}`);
    result.push('');

    for(let part of this.parts) {
      result.push(boundaryLeftPadded);
      result.push(part.toString());
    }
    result.push(`${boundaryLeftPadded}--`);

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
