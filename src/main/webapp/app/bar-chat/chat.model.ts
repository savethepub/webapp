export interface ChatMessage {
  sender: Sender;
  content: string;
  sentAt: Date;
}

export interface Sender {
  type: SenderType;
  name: string;
}

export enum SenderType {
  Bar,
  Customer
}
