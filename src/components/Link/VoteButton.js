import React from 'react';

/**
 * Renders a VoteButton component.
 *
 * @param {Object} props - The props object containing the event handler 
 *                         for voting.
 * @param {Function} props.onVote - The function to be called when the 
 *                                  vote button is clicked.
 * @returns {JSX.Element} - The vote button component.
 */
function VoteButton({ onVote }) {
  return (
    <button onClick={onVote}>^</button>
  );
}

export default VoteButton;

