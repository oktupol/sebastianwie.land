export type Position = 'up' | 'down';
export type VerificationResponse = 'not-an-eml-file'
  | 'not-from-me'
  | 'not-a-multipart-file'
  | 'encrypted'
  | 'no-signature-present'
  | 'bad-signature'
  | 'good-signature'
  | 'protonmail';
