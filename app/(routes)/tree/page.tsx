'use client';
import { useEffect, useState } from 'react';
import QuestionCard from '../../components/QuestionCard';
import ResultCard from '../../components/ResultCard';

interface NodeType {
  id: number;
  name: string;
  framework?: string;
  children?: NodeType[];
}

export default function TreePage() {
  const [treeData, setTreeData] = useState<NodeType | null>(null);
  const [currentNode, setCurrentNode] = useState<NodeType | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/decision-tree')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch decision tree');
        return res.json();
      })
      .then(data => {
        setTreeData(data);
        setCurrentNode(data);
      })
      .catch(() => setError('Unable to load decision tree data.'));
  }, []);

  const handleSelect = (node: NodeType) => {
    setCurrentNode(node);
    setBreadcrumbs([...breadcrumbs, node.name]);
  };

  const handleBreadcrumbClick = (index: number) => {
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    let node = treeData as NodeType;
    newBreadcrumbs.forEach(crumb => {
      node = (node.children || []).find(c => c.name === crumb) as NodeType;
    });
    setCurrentNode(node);
  };

  const handleRestart = () => {
    setCurrentNode(treeData);
    setBreadcrumbs([]);
  };

  if (error) {
    return <div><p>{error}</p></div>;
  }

  if (!currentNode) {
    return <p>Loading...</p>;
  }

  const calculateTotalSteps = (node: NodeType): number => {
    if (!node.children) return 1;
    return 1 + Math.max(...(node.children || []).map(calculateTotalSteps));
  };

  const totalSteps = calculateTotalSteps(treeData as NodeType);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Decision Tree App</h1>
      <p>
        Path:{' '}
        {breadcrumbs.map((crumb, index) => (
          <span
            key={index}
            onClick={() => handleBreadcrumbClick(index)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {crumb} &gt;{' '}
          </span>
        ))}
      </p>
      <p>Step {breadcrumbs.length + 1} of {totalSteps}</p>
      {currentNode.framework ? (
        <ResultCard framework={currentNode.framework} onRestart={handleRestart} />
      ) : (
        <QuestionCard question={currentNode.name} options={currentNode.children || []} onSelect={handleSelect} />
      )}
    </div>
  );
}
