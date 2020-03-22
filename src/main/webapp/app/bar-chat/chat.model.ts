export class ChatMessage {
  constructor(public sender: SenderType, public content: string, public sentAt: Date) {}
}

export enum SenderType {
  Bar,
  Customer
}
