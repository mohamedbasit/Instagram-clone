import React, { useState, useEffect } from 'react'
import { db } from "../firebase";
import "./comment.css"
import firebase from "firebase";

function Comment({ postId, user }) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = db
                .collection("posts")
                .doc(postId)
                .collection("comments")
                .orderBy("timestamp", "desc")
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => ({
                        id: doc.id,
                        c: doc.data()
                    })));
                });
        }
        return () => {
            unsubscribe();
        }
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();

        db
            .collection("posts")
            .doc(postId)
            .collection("comments")
            .add({
                text: comment,
                username: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

        setComment('');
    }

    return (
        <div>
            <div className="post__comments">
                {
                    comments.map(({ id, c }) => (
                        <p key={id}>
                            <strong>{c.username}</strong> : {c.text}
                        </p>
                    ))
                }
            </div>
            <form className="comment__section">
                <input
                    className="comment__input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => { setComment(e.target.value) }}
                />
                <button
                    className="comment__button"
                    disabled={!comment}
                    type="submit"
                    onClick={postComment}
                >Post</button>
            </form>
        </div>
    )
}

export default Comment
