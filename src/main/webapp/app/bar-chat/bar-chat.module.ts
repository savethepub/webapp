import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat/chat.component';
import { ChatBubbleComponent } from './chat-bubble/chat-bubble.component';
import { Router, RouterModule } from '@angular/router';
import { ChatSelectorComponent } from './chat-selector/chat-selector.component';

@NgModule({
  declarations: [ChatComponent, ChatBubbleComponent, ChatSelectorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'chat/:bar',
        component: ChatComponent
      }
      // todo: implement 404 bar not found
    ])
  ]
})
export class BarChatModule {}
