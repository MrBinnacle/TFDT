import React from 'react';

const QuestionCard = ({ question, options, onSelect }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h2>{question}</h2>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option)}
          style={{
            display: 'block',
            margin: '10px 0',
            padding: '10px 15px',
            fontSize: '16px',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {option.name}
        </button>
      ))}
    </div>
  );
};

export default QuestionCard;
