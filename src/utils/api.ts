import axios from 'axios';
import { ChatMessage } from '../types';

export const sendMessageToOpenAI = async (prompt: string, conversationHistory: ChatMessage[]): Promise<{ candidateResponse: string, suggestions: string[] }> => {
  try {
    const response = await axios.post('/api/openai', { prompt, conversationHistory });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    }
    console.error("Error sending message to OpenAI:", error);
    throw new Error("Failed to get response from OpenAI");
  }
};