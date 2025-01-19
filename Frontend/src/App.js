import React, { useState, useEffect } from 'react';
import QuestionCard from './QuestionCard';
import ResultCard from './ResultCard';

const App = () => {
  const [treeData, setTreeData] = useState(null); // Store the entire decision tree
  const [currentNode, setCurrentNode] = useState(null); // Track the current question or result
  const [breadcrumbs, setBreadcrumbs] = useState([]); // Store the navigation path
  const [error, setError] = useState(null); // Track errors

  useEffect(() => {
    // Fetch decision tree data from the backend
    fetch('http://localhost:3001/api/decision-tree')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch decision tree');
        return response.json();
      })
      .then((data) => {
        setTreeData(data); // Store the root of the decision tree
        setCurrentNode(data); // Start at the root node
      })
      .catch(() => setError('Unable to load decision tree data. Please try again later.'));
  }, []);

  const handleSelect = (node) => {
    // Navigate to the selected child node
    setCurrentNode(node);
    setBreadcrumbs([...breadcrumbs, node.name]);
  };

  const handleBreadcrumbClick = (index) => {
    // Navigate back to a previous node based on breadcrumbs
    const newBreadcrumbs = breadcrumbs.slice(0, index + 1);
    setBreadcrumbs(newBreadcrumbs);

    let node = treeData;
    newBreadcrumbs.forEach((crumb) => {
      node = node.children.find((child) => child.name === crumb);
    });
    setCurrentNode(node);
  };

  const handleRestart = () => {
    // Reset the app to the root node
    setCurrentNode(treeData);
    setBreadcrumbs([]);
  };

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  if (!currentNode) {
    return <p>Loading...</p>;
  }

  const calculateTotalSteps = (node) => {
    // Calculate the total number of steps in the decision tree
    if (!node.children) return 1;
    return 1 + Math.max(...node.children.map(calculateTotalSteps));
  };

  const totalSteps = calculateTotalSteps(treeData);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Decision Tree App</h1>
      <p>
        Path:{" "}
        {breadcrumbs.map((crumb, index) => (
          <span
            key={index}
            onClick={() => handleBreadcrumbClick(index)}
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
          >
            {crumb} &gt;{" "}
          </span>
        ))}
      </p>
      <p>Step {breadcrumbs.length + 1} of {totalSteps}</p>
      {currentNode.framework ? (
        <ResultCard framework={currentNode.framework} onRestart={handleRestart} />
      ) : (
        <QuestionCard
          question={currentNode.name}
          options={currentNode.children}
          onSelect={handleSelect}
        />
      )}
    </div>
  );
};

export default App;
