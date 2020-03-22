import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage, SenderType } from 'app/bar-chat/chat.model';

@Component({
  selector: 'jhi-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.scss']
})
export class ChatBubbleComponent implements OnInit {
  SenderType = SenderType;
  @Input() message!: ChatMessage;

  constructor() {}

  ngOnInit(): void {}
}
