import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

async function loadTree() {
  const file = await fs.readFile(
    path.resolve(process.cwd(), 'data', 'decision_tree.json'),
    'utf-8'
  );
  return JSON.parse(file);
}

function findNodeById(node: any, id: number): any {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const result = findNodeById(child, id);
      if (result) return result;
    }
  }
  return null;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const idParam = url.searchParams.get('id');
  try {
    const tree = await loadTree();
    if (idParam) {
      const node = findNodeById(tree, Number(idParam));
      if (!node) return NextResponse.json({ error: 'Node not found' }, { status: 404 });
      return NextResponse.json(node);
    }
    return NextResponse.json(tree);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
