import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/chat/completions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getChatCompletion(
  messages: ChatCompletionMessageParam[],
  model: 'gpt-4' | 'gpt-3.5-turbo' = 'gpt-3.5-turbo'
) {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 1000,
  });

  return completion.choices[0].message;
}

export async function generateTitle(content: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Generate a short, concise title (max 50 chars) for this chat message.',
      },
      {
        role: 'user',
        content,
      },
    ],
    temperature: 0.7,
    max_tokens: 50,
  });

  return completion.choices[0].message.content?.slice(0, 50) || 'New Chat';
}
