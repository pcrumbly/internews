// Comments.js
import React from 'react';
import CommentCard from './CommentCard';
import { useParams } from 'react-router-dom';


function Comments() {
    const { linkId } = useParams();

    console.log(linkId);
    return (
        <div>
            <h2>Comments for link {linkId}</h2>
            <CommentCard linkId={linkId} />
        </div>
    );
}

export default Comments;
