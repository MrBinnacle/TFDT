import { z } from 'zod';

export const LocalRequestSchema = z.object({
  prompt: z.string(),
  model: z.string().default('llama2'),
  endpoint: z.string().default('http://localhost:11434/api/generate'),
});

export async function callLocal(input: z.infer<typeof LocalRequestSchema>) {
  const { prompt, model, endpoint } = LocalRequestSchema.parse(input);
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, prompt }),
  });
  if (!response.ok) {
    throw new Error(`Local LLM error: ${response.status}`);
  }
  const data = await response.json();
  return data.response?.trim() || '';
}
