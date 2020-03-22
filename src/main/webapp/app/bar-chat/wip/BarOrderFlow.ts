import { IBotFlow } from 'app/bar-chat/wip/IBotFLow';
import { ChatMessage, MessageParameterValues } from 'app/bar-chat/chat.model';

// stellt die messages zur verfügung
export class BarOrderFlow implements IBotFlow {
  messages: ChatMessage[];
  parameterValues: MessageParameterValues[];

  constructor() {
    this.parameterValues = [];
    this.messages = [];
  }

  getMessages(): ChatMessage[] {
    return [];
  }

  public constructMessages(): void {
    const welcomeMessage = new ChatMessage('welcomeMessage', 'Gute Wahl, hier braut der Wirt sogar noch selbst!');
    const welcomeMessageAlternative = new ChatMessage(
      'welcome',
      'Cool! XX andere waren auch schon hier. Die Atmosphäre ist immer ganz besonders.!'
    );
    const selectDrink = new ChatMessage('selectDrink', "Was darf's sein Schätzchen?", [
      {
        label: 'Bier',
        value: 'beer'
      },
      {
        label: 'Wein',
        value: 'wine'
      },
      {
        label: 'Sofdrink',
        value: 'softdrink'
      },
      {
        label: 'Wasser',
        value: 'water'
      }
    ]);
    const orderAccept = new ChatMessage(
      'orderAccept',
      'Ein %selectedDrink%? Kommt sofort! Lass mich nur noch schnell dein Glas durchspülen!'
    );
    const orderAccept = new ChatMessage('payment', 'Super! Das macht %orderPrice%. Wie möchtest du bezahlen?', [
      {
        label: 'Link A',
        value: 'url'
      },
      {
        label: 'Wein',
        value: 'wine'
      },
      {
        label: 'Sofdrink',
        value: 'softdrink'
      },
      {
        label: 'Wasser',
        value: 'water'
      }
    ]);
    this.messages = [welcomeMessage];
  }

  public setValues(parameterValues: MessageParameterValues[]): void {
    this.parameterValues = parameterValues;
  }
}
