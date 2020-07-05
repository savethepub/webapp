import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage } from 'app/bar-chat/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chat = new BehaviorSubject<ChatMessage[]>([]);
  private isEmpty = true;

  constructor() {}

  // for implementation with chatflow
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userInput(input: string): void {
    // const userMessage = new ChatMessage('newUserMessage', SenderType.Customer, content, new Date());
    // this.pushMessage(userMessage);
    // const botMessage = new ChatMessage('', SenderType.Bar, 'Botnachricht', new Date());
    // this.pushMessage(botMessage);
  }

  isChatEmpty(): boolean {
    return this.isEmpty;
  }

  pushMessage(message: ChatMessage): void {
    this.chat.next([message]);
    this.isEmpty = false;
  }
}
