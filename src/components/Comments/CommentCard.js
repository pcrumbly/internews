import React, { useEffect } from 'react';
import { useGlobalState, useGlobalDispatch } from '../../contexts/GlobalStateContext';
import timeSince from '../../services/myUtils';

function CommentCard({ linkId }) {
    const state = useGlobalState();
    const dispatch = useGlobalDispatch();

    // Comments for the specific linkId from the global state
    const comments = state.comments[linkId] || [];

    useEffect(() => {
        const fetchCommentsData = async () => {
            try {
                // Use the fetchComments function from the global dispatch
                await dispatch.fetchComments(linkId);
            } catch (error) {
                console.error('Error fetching comments data:', error);
            }
        };

        fetchCommentsData();
    }, [linkId, dispatch]);

    if (comments.length === 0) return <div>No comments yet!</div>;

    return (
        <div>
            {comments.map((comment, index) => (
                <div key={comment.id}>
                    <strong>{index + 1}. </strong> {comment.text}
                    <small><p>{timeSince(comment.createdAt)}</p></small>
                </div>
            ))}
        </div>
    );
} 

export default CommentCard;
