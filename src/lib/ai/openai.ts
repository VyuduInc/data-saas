import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeDataWithAI(query: string, data: any) {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a data analysis expert. Analyze the provided data and answer questions about it."
      },
      {
        role: "user",
        content: `Data: ${JSON.stringify(data)}\n\nQuery: ${query}`
      }
    ]
  });

  return response.choices[0].message.content;
}