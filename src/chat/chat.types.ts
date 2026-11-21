export interface SendChatMessage {
  conversationId: string;
  senderId: string;
  content: string;
}

export interface ChatMessage extends SendChatMessage {
  sentAt: string;
}
