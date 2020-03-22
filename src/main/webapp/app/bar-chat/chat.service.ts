import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ChatMessage, SenderType } from 'app/bar-chat/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chat = new BehaviorSubject<ChatMessage[]>([]);

  constructor() {}

  userInput(content: string): void {
    const userMessage = new ChatMessage(SenderType.Customer, content, new Date());
    this.pushMessage(userMessage);
    // todo: implement
    const botMessage = new ChatMessage(SenderType.Bar, 'Botnachricht', new Date());
    this.pushMessage(botMessage);
  }

  private pushMessage(message: ChatMessage): void {
    this.chat.next([message]);
  }
}
