import { IGastronomy } from 'app/shared/model/gastronomy.model';
import { ChatMessage, SenderType } from 'app/bar-chat/chat.model';

export class OrderBotFlow {
  constructor(private gastronomy: IGastronomy | null) {
    if (!gastronomy) throw new Error('No gastronomy provided');
  }

  welcomeMessage(): ChatMessage {
    const messagePool = [
      'Gute Wahl, hier braut der Wirt sogar noch selbst!',
      'Cool! Gut besucht ist es und die Atmosphäre ist immer ganz besonders.!'
    ];
    return new ChatMessage('welcome', this.getRandomMessage(messagePool), [], SenderType.Bar, new Date());
  }

  selectDrinkMessage(): ChatMessage {
    const messagePool = ["Was darf's sein Schätzchen ?"];
    return new ChatMessage(
      'selectDrink',
      this.getRandomMessage(messagePool),
      [
        {
          label: 'Bier',
          value: 'beer'
        },
        {
          label: 'Wein',
          value: 'wine'
        },
        {
          label: 'Softdrink',
          value: 'softdrink'
        },
        {
          label: 'Wasser',
          value: 'water'
        }
      ],
      SenderType.Customer,
      new Date()
    );
  }

  afterSelectMessage(selectedDrink: string): ChatMessage {
    const messagePool = [`Ein ${selectedDrink}? Kommt sofort! Lass mich nur noch schnell dein Glas durchspülen!`];

    return new ChatMessage('afterSelectedDrink', this.getRandomMessage(messagePool), [], SenderType.Bar, new Date());
  }

  paymentMessage(): ChatMessage {
    const messagePool = ['Super, dass wären dann 1,30€. Wie möchtest du bezahlen?'];

    return new ChatMessage(
      'payment',
      this.getRandomMessage(messagePool),
      [
        {
          label: 'Spendelink', // todo: implement different support link type labels
          value: this.gastronomy?.supportLink
        }
      ],
      SenderType.Bar,
      new Date()
    );
  }

  getThanksMessage(): ChatMessage {
    const messagePool = [`Schönen Tag dir noch und vielen Dank, dass du hier warst. Komm gerne wieder und erzähl's deinen Freunden!`];
    // todo: check if the links are really available/set
    return new ChatMessage(
      'socialMessage',
      this.getRandomMessage(messagePool),
      [
        {
          label: 'Facebook',
          value: this.gastronomy?.facebookLink
        },
        {
          label: 'Instagram',
          value: this.gastronomy?.instagramLink
        },
        {
          label: 'Twitter',
          value: this.gastronomy?.twitterLink
        }
      ],
      SenderType.Bar,
      new Date()
    );
  }

  private getRandomMessage(messages: string[]): string {
    if (messages.length) return messages[Math.floor(Math.random() * messages.length)];
    return '';
  }
}
