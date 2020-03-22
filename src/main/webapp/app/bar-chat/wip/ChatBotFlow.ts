import { IBotFlow } from 'app/bar-chat/wip/IBotFLow';
import { MessageOptionValue } from 'app/bar-chat/chat.model';

export class ChatBotFlow {
  private currentMessageId: number;
  private readonly selectedOptions: MessageOptionValue[];

  // übernimmt das generelle handling von messages
  constructor(private botFlow: IBotFlow) {
    this.currentMessageId = 0;
    this.selectedOptions = [];
  }

  get SelectedOptions(): MessageOptionValue[] {
    return this.selectedOptions;
  }

  setSelectedOption(chatMessageKey: string, selectedValue: string): void {
    this.selectedOptions.push({
      messageKey: chatMessageKey,
      selectedOptionValue: selectedValue
    });
  }
}
