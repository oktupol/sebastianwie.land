export interface Headers {
  [name: string]: string
};
export interface ContentType {
  type: string;
  params?: {
    [name: string]: string
  }
}
export interface Email {
  headers: Headers,
  contentType: ContentType,
  content: string,
  parts?: Array<{ raw: string, parsed: Email }>
  isMultipart: boolean
};
