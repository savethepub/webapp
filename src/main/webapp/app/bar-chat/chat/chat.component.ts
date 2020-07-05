import { Component, OnInit } from '@angular/core';
import { ChatMessage, Option, SenderType } from 'app/bar-chat/chat.model';
import { ChatService } from 'app/bar-chat/chat.service';
import { Observable, timer, concat, of } from 'rxjs';
import { flatMap, map, scan, take } from 'rxjs/operators';
import { OrderBotFlow } from 'app/bar-chat/OrderBotFlow';
import { ActivatedRoute } from '@angular/router';
import { GastronomyService } from 'app/entities/gastronomy/gastronomy.service';

@Component({
  selector: 'jhi-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  SenderType = SenderType;
  chat: Observable<ChatMessage[]>;
  userMessage: string;
  // orderBot: ChatBotFlow;
  orderBot!: OrderBotFlow;
  botMessageQueue: Array<string> = [];

  constructor(private gastronomyService: GastronomyService, public chatService: ChatService, private route: ActivatedRoute) {
    // this.orderBot = new ChatMessageFlowFactory().getChat('BarOrder');

    this.userMessage = '';
    this.chat = chatService.chat.asObservable().pipe(scan((messagesAcc, messagesVal) => messagesAcc.concat(messagesVal)));

    try {
      this.route.params
        .pipe(
          take(1),
          flatMap(currentRoute => this.gastronomyService.find(currentRoute.barId)),
          map(httpEntity => httpEntity.body),
          flatMap(gastronomy => {
            this.orderBot = new OrderBotFlow(gastronomy);
            if (this.chatService.isChatEmpty()) {
              return this.startInteraction();
            } else {
              return of();
            }
          })
        )
        .subscribe();
    } catch {
      return;
      // todo: goto 404
    }
  }

  startInteraction(): Observable<void> {
    return concat(this.talk(this.orderBot.welcomeMessage()), this.talk(this.orderBot.selectDrinkMessage()));
  }

  private talk(message: ChatMessage): Observable<void> {
    return timer(2000).pipe(map(() => this.chatService.pushMessage(message)));
  }

  userSelection(messageId: string, selectedOption: Option): void {
    switch (messageId) {
      case 'selectDrink':
        this.chatService.pushMessage(this.orderBot.afterSelectMessage(selectedOption.label));
        setTimeout(() => {
          this.chatService.pushMessage(this.orderBot.paymentMessage());
        }, 2000);
        break;
      case 'payment':
        this.chatService.pushMessage(this.orderBot.getThanksMessage());
        setTimeout(() => {
          window.open(selectedOption.value, '_blank');
          // todo: handle no url
        }, 2000);
        break;
      case 'socialMessage':
        window.open(selectedOption.value, '_blank');
        break;
    }
  }

  sendMessage(): void {
    this.chatService.userInput(this.userMessage);
  }

  ngOnInit(): void {}
}
