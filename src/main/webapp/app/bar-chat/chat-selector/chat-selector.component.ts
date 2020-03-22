import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatMessage, Option } from 'app/bar-chat/chat.model';

@Component({
  selector: 'jhi-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss']
})
export class ChatSelectorComponent implements OnInit {
  @Input() message!: ChatMessage;
  @Output() valueSelected = new EventEmitter();
  isClicked = false;

  constructor() {}

  valueClicked(key: string, option: Option): void {
    this.isClicked = true;
    this.valueSelected.emit({ messageKey: key, selectedOption: option });
  }

  ngOnInit(): void {}
}
