export class ChatMessage {
  constructor(public key: string, public content: string, public options: Option[] = [], public sender: SenderType, public sentAt: Date) {}
}

export enum SenderType {
  Bar,
  Customer
}

export interface Option {
  label: string;
  value?: string;
}

export interface MessageOptionValue {
  messageKey: string;
  selectedOptionValue: string;
}

export interface MessageParameterValues {
  key: string;
  value: string;
}
