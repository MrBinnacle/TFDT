import { jsPDF } from "jspdf";

export interface TreeNode {
  node_id: string;
  parent_node_id: string | null;
  input_symptom: string;
  game_type: string;
  strategy_mode: string;
  frameworks: string[];
  reward: number;
  probability: number;
  children: TreeNode[];
}

export function exportTreeToPDF(tree: TreeNode): void {
  const doc = new jsPDF();
  const lines: string[] = [];
  const walk = (node: TreeNode, depth: number) => {
    const indent = " ".repeat(depth * 2);
    lines.push(`${indent}- Node ID: ${node.node_id}`);
    lines.push(`${indent}  Input Symptom: ${node.input_symptom}`);
    lines.push(`${indent}  Game Type: ${node.game_type}`);
    lines.push(`${indent}  Strategy Mode: ${node.strategy_mode}`);
    lines.push(`${indent}  Frameworks: ${node.frameworks.join(", ")}`);
    lines.push(`${indent}  Reward: ${node.reward}`);
    lines.push(`${indent}  Probability: ${node.probability}`);
    node.children.forEach(c => walk(c, depth + 1));
  };
  walk(tree, 0);
  doc.setFont("courier", "normal");
  doc.setFontSize(12);
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 10;
  lines.forEach(line => {
    if (y > pageHeight - 10) {
      doc.addPage();
      y = 10;
    }
    doc.text(line, 10, y);
    y += 7;
  });
  doc.save("tree.pdf");
}

export function exportTreeToMarkdown(tree: TreeNode): string {
  const walk = (node: TreeNode, depth: number): string => {
    const indent = "  ".repeat(depth);
    let out = `${indent}- **Node ID:** ${node.node_id}\n`;
    out += `${indent}  - Input Symptom: ${node.input_symptom}\n`;
    out += `${indent}  - Game Type: ${node.game_type}\n`;
    out += `${indent}  - Strategy Mode: ${node.strategy_mode}\n`;
    out += `${indent}  - Frameworks: ${node.frameworks.join(", ")}\n`;
    out += `${indent}  - Reward: ${node.reward}\n`;
    out += `${indent}  - Probability: ${node.probability}\n`;
    node.children.forEach(c => {
      out += walk(c, depth + 1);
    });
    return out;
  };
  return walk(tree, 0);
}

const sampleTree: TreeNode = {
  node_id: "root",
  parent_node_id: null,
  input_symptom: "fatigue",
  game_type: "typeA",
  strategy_mode: "mode1",
  frameworks: ["framework1"],
  reward: 1,
  probability: 0.9,
  children: [
    {
      node_id: "child1",
      parent_node_id: "root",
      input_symptom: "stress",
      game_type: "typeB",
      strategy_mode: "mode2",
      frameworks: ["framework2"],
      reward: 2,
      probability: 0.5,
      children: []
    }
  ]
};

exportTreeToPDF(sampleTree);
const markdown = exportTreeToMarkdown(sampleTree);
console.log(markdown);
