import { z } from 'zod';
import { callOpenAI } from '../../../lib/llm/clients/openai';
import { callClaude } from '../../../lib/llm/clients/claude';
import { callLocal } from '../../../lib/llm/clients/local';
import { callTemplateRAG } from '../../../lib/llm/clients/templateRAG';

export const LLMRouterSchema = z.object({
  model: z.enum(['gpt4', 'claude3', 'local', 'templateRAG']).default('gpt4'),
  task: z.string(),
  input: z.any(),
  options: z.record(z.any()).optional(),
});

export async function llmRouter(params: z.infer<typeof LLMRouterSchema>) {
  const { model, task, input, options } = LLMRouterSchema.parse(params);

  switch (model) {
    case 'gpt4':
      return { summary: await callOpenAI({ prompt: input, ...(options||{}) }), sourceModel: 'gpt4' };
    case 'claude3':
      return { summary: await callClaude({ prompt: input, ...(options||{}) }), sourceModel: 'claude3' };
    case 'local':
      return { summary: await callLocal({ prompt: input, ...(options||{}) }), sourceModel: 'local' };
    case 'templateRAG':
      return { summary: await callTemplateRAG({ nodeSummary: input, ...(options||{}) }), sourceModel: 'templateRAG' };
    default:
      throw new Error('Unsupported model');
  }
}
