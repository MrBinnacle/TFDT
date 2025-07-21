import { z } from 'zod';

export const TemplateRAGRequestSchema = z.object({
  nodeSummary: z.string(),
  template: z.string().default('Summarize: {{text}}'),
});

export async function callTemplateRAG(input: z.infer<typeof TemplateRAGRequestSchema>) {
  const { nodeSummary, template } = TemplateRAGRequestSchema.parse(input);
  const summary = template.replace('{{text}}', nodeSummary);
  return summary;
}
