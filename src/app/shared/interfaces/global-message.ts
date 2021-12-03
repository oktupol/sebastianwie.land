export type MessageType = 'info' | 'success' | 'warn' | 'error';

export interface GlobalMessage {
  message: string;
  type: MessageType
}
