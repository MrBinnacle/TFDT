import { NextRequest, NextResponse } from 'next/server';
import { llmRouter } from '../llmRouter';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text, model } = body;
  try {
    const result = await llmRouter({ model: model || 'gpt4', task: 'summarize', input: text });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
