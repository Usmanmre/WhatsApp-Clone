import { Injectable } from '@nestjs/common';
import { ChatMessage, SendChatMessage } from './chat.types';

@Injectable()
export class ChatService {
  createMessage(message: SendChatMessage): ChatMessage {
    return {
      ...message,
      sentAt: new Date().toISOString(),
    };
  }
}
