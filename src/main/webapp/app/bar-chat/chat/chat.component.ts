import { Component, OnInit } from '@angular/core';
import { ChatMessage, SenderType } from 'app/bar-chat/chat.model';
import { ChatService } from 'app/bar-chat/chat.service';
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'jhi-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  SenderType = SenderType;
  chat: Observable<ChatMessage[]>;
  userMessage: string;

  constructor(public chatService: ChatService) {
    this.userMessage = '';
    this.chat = chatService.chat.asObservable().pipe(scan((messagesAcc, messagesVal) => messagesAcc.concat(messagesVal)));
  }

  sendMessage(): void {
    this.chatService.userInput(this.userMessage);
  }

  ngOnInit(): void {}
}
