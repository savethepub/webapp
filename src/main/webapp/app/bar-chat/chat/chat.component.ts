import { Component, OnInit } from '@angular/core';
import { ChatMessage, Option, SenderType } from 'app/bar-chat/chat.model';
import { ChatService } from 'app/bar-chat/chat.service';
import { Observable } from 'rxjs';
import { flatMap, map, scan } from 'rxjs/operators';
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

  constructor(private gastronomyService: GastronomyService, public chatService: ChatService, private route: ActivatedRoute) {
    // this.orderBot = new ChatMessageFlowFactory().getChat('BarOrder');

    this.userMessage = '';
    this.chat = chatService.chat.asObservable().pipe(scan((messagesAcc, messagesVal) => messagesAcc.concat(messagesVal)));

    try {
      this.route.params
        .pipe(
          flatMap(currentRoute => this.gastronomyService.find(currentRoute.barId)),
          map(httpEntity => httpEntity.body)
        )
        .subscribe(gastronomy => {
          this.orderBot = new OrderBotFlow(gastronomy);
          this.startInteraction();
        });
    } catch {
      return;
      // todo: goto 404
    }
  }

  startInteraction(): void {
    this.chatService.pushMessage(this.orderBot.welcomeMessage());
    setTimeout(() => {
      this.chatService.pushMessage(this.orderBot.selectDrinkMessage());
    }, 1000);
  }

  userSelection(messageId: string, selectedOption: Option): void {
    switch (messageId) {
      case 'selectDrink':
        this.chatService.pushMessage(this.orderBot.afterSelectMessage(selectedOption.label));
        setTimeout(() => {
          this.chatService.pushMessage(this.orderBot.paymentMessage());
        }, 1000);
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
