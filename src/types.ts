export interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}