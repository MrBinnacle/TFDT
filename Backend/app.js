import React, { useState, useEffect } from 'react';
import QuestionCard from './components/QuestionCard';
import ResultCard from './components/ResultCard';

const App = () => {
  const [treeData, setTreeData] = useState(null);
  const [currentNode, setCurrentNode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch decision tree JSON
    fetch('/decision_tree.json')
      .then((response) => response.json())
      .then((data) => {
        setTreeData(data);
        setCurrentNode(data); // Start at the root node
      })
      .catch((err) => {
        setError('Failed to load decision tree data.');
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  if (!currentNode) {
    return <p>Loading...</p>;
  }

  // Render QuestionCard or ResultCard
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Decision Tree App</h1>
      {currentNode.framework ? (
        <ResultCard
          framework={currentNode.framework}
          onRestart={() => setCurrentNode(treeData)}
        />
      ) : (
        <QuestionCard
          question={currentNode.name}
          options={currentNode.children}
          onSelect={(node) => setCurrentNode(node)}
        />
      )}
    </div>
  );
};

export default App;
