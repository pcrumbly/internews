import React from 'react';

function VoteButton({ onVote }) {
  return (
    <button onClick={onVote}>^</button>
  );
}

export default VoteButton;

