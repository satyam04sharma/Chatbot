import { OpenAI } from 'openai'; // Updated import
import { ChatMessage } from '../types';

// Define the ChatCompletionRequestMessage type
type ChatCompletionRequestMessage = {
  role: 'system' | 'user' | 'assistant';
  content: string;
};

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Correct instantiation

/**
 * Generates exactly 3 concise and relevant interview questions that a recruiter
 * might ask a candidate, based on the candidate's resume and any existing
 * conversation history.
 *
 * @param {object} resume The candidate's resume as a JSON object
 * @param {ChatMessage[]} conversationHistory The conversation history between the
 *   recruiter and candidate as an array of ChatMessage objects
 *
 * @returns {Promise<string[]>} A promise that resolves with an array of 3
 *   interview questions as strings
 */
export async function generateQuestionSuggestions(
  resume: any,
  conversationHistory: ChatMessage[]
): Promise<string[]> {
  const messages_history: ChatCompletionRequestMessage[] = [
    {
      role: 'system',
      content: `You are a helpful assistant generating interview questions for a recruiter.

Candidate's Resume:
${JSON.stringify(resume, null, 2)}

Based on the candidate's resume, generate exactly 3 concise and relevant questions that a recruiter might ask to delve deeper into the candidate's qualifications, experience, and skills.

Provide the questions in plain text, in a numbered list. Do not include any additional text, headings, or Markdown formatting. Each question should start with the number and a period (e.g., "1. How...") and be no longer than 15 words.`,
    },
    ...conversationHistory.map((msg) => ({
      role: (msg.type === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
      content: msg.content,
    })),
  ];

  try {
    const completion = await openai.chat.completions.create({ // Updated method call
      model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
      messages: messages_history,
      max_tokens: parseInt(process.env.SUGGESTION_MAX_TOKENS || '200', 10),
      n: 1,
      temperature: parseFloat(process.env.SUGGESTION_TEMPERATURE || '0.7'),
    });

    const suggestionsText = completion.choices[0].message?.content || '';
    const suggestions = suggestionsText
      .split('\n')
      .filter((line) => /^\d+\.\s/.test(line.trim()))
      .map((line) => line.trim())
      .slice(0, 3); // Ensure only 3 suggestions

    return suggestions.map((suggestion) =>
      suggestion.replace(/^\d+\.\s*/, '').trim()
    );
  } catch (error) {
    console.error('Error generating question suggestions:', error);
    return [];
  }
}