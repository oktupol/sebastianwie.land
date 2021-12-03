export interface Message {
  subject: string;
  fromName: string;
  fromEmail: string;
  message: string;
  attachments?: Array<File | null>;
}
