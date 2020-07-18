import React from 'react'
import "./post.css"
import Avatar from '@material-ui/core/Avatar';
import Comment from "../comment/Comment";

function Post(prop) {
    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={prop.username}
                    src="/static/images/avatar/1.jpg"
                />
                <h3>{prop.username}</h3>
                <div className="post__datetime">
                    {new Date(prop.timestamp?.seconds * 1000).toLocaleString()}
                </div>

            </div>
            {prop.imageUrl ?
                <img
                    className="post__image"
                    src={prop.imageUrl}
                    alt=""></img> :
                ""
            }

            <h4 className="post__caption"><b>{prop.username}</b> :  {prop.caption}</h4>
            {
                prop.user && <Comment postId={prop.postId} user={prop.user} />
            }
        </div>
    )
}

export default Post
