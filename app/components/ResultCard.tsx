'use client';
import React from 'react';

export default function ResultCard({ framework, onRestart }: { framework: string; onRestart: () => void; }) {
  return (
    <div style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
      <h2>Recommended Framework</h2>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007BFF' }}>{framework}</p>
      <button
        onClick={onRestart}
        style={{
          marginTop: '20px',
          padding: '10px 15px',
          fontSize: '16px',
          borderRadius: '5px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Restart
      </button>
    </div>
  );
}
