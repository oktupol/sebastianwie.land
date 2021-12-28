export interface StoreMessage{
  subject: string;
  fromName: string;
  fromEmail: string;
  requestEncryptedReply: boolean;
  encryptionPassphrase: string;
  message: string;
}

export interface Message extends StoreMessage {
  attachments?: Array<File | null>;
}
