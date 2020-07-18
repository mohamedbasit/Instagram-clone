import React, { useState, useEffect } from 'react';
import './App.css';
import { db, auth } from "./firebase";
import Header from "./header/Header";
import Post from './Post/Post';
import ImageUpload from "./imageUpload/ImageUpload";

function App() {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        setUser(authuser);
      } else {
        setUser(null);
      }
    })
    return () => {
      unsubscribe();
    }
  }, [user])

  useEffect(() => {
    //once this code will run
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      //execute on every chagne in db 
      setPosts(snapshot.docs.map(doc => ({
        post: doc.data(),
        id: doc.id
      })))
    })
  }, [])

  return (
    <div className="app">

      <Header user={user} />

      {user?.displayName ?
        <div>
          <ImageUpload username={user.displayName} />
          <div className="app_posts">
            {
              posts.map(({ id, post }) => (
                <Post
                  key={id}
                  postId={id}
                  user={user}
                  username={post.username}
                  caption={post.caption}
                  imageUrl={post.imageUrl}
                  timestamp={post.timestamp}
                />
              ))
            }
          </div>
        </div> :
        <h3>Login to upload</h3>
      }
    </div>
  );
}

export default App;
