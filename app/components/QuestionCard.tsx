'use client';
import React from 'react';

interface Option {
  id: number;
  name: string;
  children?: Option[];
  framework?: string;
}

export default function QuestionCard({ question, options, onSelect }: { question: string; options: Option[]; onSelect: (o: Option) => void; }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '10px' }}>
      <h2>{question}</h2>
      {options.map(option => (
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
}
