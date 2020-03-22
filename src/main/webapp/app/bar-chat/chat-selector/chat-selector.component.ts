import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'jhi-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.scss']
})
export class ChatSelectorComponent implements OnInit {
  @Input() options!: string[];

  constructor() {}

  ngOnInit(): void {}
}
