import OpenAI from 'openai';
import { ChatMessage } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuestionSuggestions(
  resume: any,
  conversationHistory: ChatMessage[]
): Promise<string[]> {
  const prompt = `You are a helpful assistant generating interview questions for a recruiter. Based on the following candidate's resume and the previous conversation, generate 3 concise and relevant questions that a recruiter might ask to delve deeper into the candidate's qualifications, experience, and skills. The questions should be directly related to the information provided in the resume and the conversation history.

Candidate's Resume:
${JSON.stringify(resume, null, 2)}

Previous Conversation:
${conversationHistory.map(msg => `${msg.type === 'user' ? 'Recruiter' : 'Candidate'}: ${msg.content}`).join('\n')}

Provide 3 short, context-specific questions in a numbered list. Each question should be no longer than 10 words.`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
      n: 1,
      temperature: 0.7,
    });

    const suggestionsText = completion.choices[0].message.content || '';
    const suggestions = suggestionsText.split('\n').filter(line => line.trim().match(/^\d+\./));
    return suggestions.map(suggestion => suggestion.replace(/^\d+\.\s*/, '').trim());
  } catch (error) {
    console.error('Error generating question suggestions:', error);
    return [];
  }
}