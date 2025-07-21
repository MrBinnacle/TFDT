import { z } from 'zod';

export const OpenAIRequestSchema = z.object({
  prompt: z.string(),
  model: z.string().default('gpt-4'),
  apiKey: z.string().optional(),
});

export async function callOpenAI(input: z.infer<typeof OpenAIRequestSchema>) {
  const { prompt, model, apiKey } = OpenAIRequestSchema.parse(input);
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey || process.env.OPENAI_API_KEY || ''}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }
  const data = await response.json();
  return data.choices?.[0]?.message?.content?.trim() || '';
}
