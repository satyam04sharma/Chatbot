import OpenAI from 'openai';
import { ChatMessage } from '../types';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateQuestionSuggestions(
  resume: any,
  conversationHistory: ChatMessage[]
): Promise<string[]> {
  const prompt = `You are a helpful assistant generating interview questions for a recruiter. Before generating specific questions, please ask the recruiter to specify which kind of experience or skills they are most interested in discussing with the candidate, so that you can tailor the questions more effectively.

Candidate's Resume:
${JSON.stringify(resume, null, 2)}

Previous Conversation:
${conversationHistory
  .map(
    (msg) =>
      `${msg.type === 'user' ? 'Recruiter' : 'Candidate'}: ${msg.content}`
  )
  .join('\n')}

Once the recruiter specifies their interests, generate 3 concise and relevant questions that a recruiter might ask to delve deeper into the candidate's qualifications, experience, and skills, focusing on the specified areas. The questions should be directly related to the information provided in the resume and the conversation history.

Keep the answer to provide 3 short, context-specific questions in a numbered list. Each question should be no longer than 15 words and do not use rich text markdown, just give these suggestions in plain text.`;


  try {
    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: parseInt(process.env.SUGGESTION_MAX_TOKENS || "200"),
      n: 1,
      temperature: parseFloat(process.env.SUGGESTION_TEMPERATURE || "0.7"),
    });

    const suggestionsText = completion.choices[0].message.content || '';
    const suggestions = suggestionsText.split('\n').filter(line => line.trim().match(/^\d+\./));
    return suggestions.map(suggestion => suggestion.replace(/^\d+\.\s*/, '').trim());
  } catch (error) {
    console.error('Error generating question suggestions:', error);
    return [];
  }
}