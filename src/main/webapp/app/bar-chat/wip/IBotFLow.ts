import { ChatMessage, MessageOptionValue, MessageParameterValues } from 'app/bar-chat/chat.model';

export interface IBotFlow {
  getMessages(): ChatMessage[];

  setValues(parameterValues: MessageParameterValues[]): void;
}
