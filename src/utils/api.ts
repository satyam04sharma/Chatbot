import axios from 'axios';
import { ChatMessage } from '../types';

/**
 * Sends a message to the OpenAI API and returns the response from the API.
 *
 * @param prompt The message to send to the OpenAI API.
 * @param conversationHistory The conversation history to send to the OpenAI API.
 *
 * @returns A promise that resolves with an object containing the candidate's response and suggested questions.
 *
 * @throws {Error} If there is an error sending the message to the OpenAI API, or if the API returns an error response.
 */
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