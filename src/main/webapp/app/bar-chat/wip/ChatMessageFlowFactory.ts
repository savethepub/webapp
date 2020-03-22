import { BarOrderFlow } from 'app/bar-chat/wip/BarOrderFlow';
import { IBotFLow } from 'app/bar-chat/wip/IBotFLow';
import { MessageParameterValues } from 'app/bar-chat/chat.model';

export class ChatMessageFlowFactory {
  getChat(chatType: string, parameterValues: MessageParameterValues[]): IBotFLow {
    let chatBotFlow;
    switch (chatType) {
      case 'BarOrder':
        chatBotFlow = new BarOrderFlow();
        break;
      default:
        throw new Error('Chat Message flow not implemented');
    }

    chatBotFlow.setValues(parameterValues);
    chatBotFlow.constructMessages();

    return chatBotFlow;
  }
}
