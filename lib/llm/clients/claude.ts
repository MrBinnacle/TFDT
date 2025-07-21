import { z } from 'zod';

export const ClaudeRequestSchema = z.object({
  prompt: z.string(),
  model: z.string().default('claude-3-sonnet-20240229'),
  apiKey: z.string().optional(),
});

export async function callClaude(input: z.infer<typeof ClaudeRequestSchema>) {
  const { prompt, model, apiKey } = ClaudeRequestSchema.parse(input);
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-Key': apiKey || process.env.ANTHROPIC_API_KEY || '',
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  if (!response.ok) {
    throw new Error(`Claude API error: ${response.status}`);
  }
  const data = await response.json();
  return data?.content?.[0]?.text?.trim() || '';
}
