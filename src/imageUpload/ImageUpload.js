import React, { useState } from 'react'
import { Button } from "@material-ui/core";
import { storage, db } from "../firebase";
import firebase from "firebase";
import './imageUpload.css';

//Important component to upload image
//
function ImageUpload({ username }) {
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);


    const handleUpload = (e) => {
        if (e.target.files[0]) {
            const _image = e.target.files[0];

            //store image into storage
            const uploadTask = storage.ref('images/' + _image.name).put(_image);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);//developer friendly message
                },
                () => {
                    storage
                        .ref('images')
                        .child(_image.name)
                        .getDownloadURL()
                        .then((url) => {
                            //post image inside the db
                            db.collection('posts').add({
                                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                                caption: caption === '' ? 'No caption' : caption,
                                imageUrl: url,
                                username: username
                            });

                            resetFields();
                        })
                }
            )
        }

        resetFields();
    }

    const resetFields = () => {
        setProgress(0);
        setCaption('');
    };

    return (
        <div className="imageupload">
            <h2>Upload image</h2>

            <input type="text"
                className="imageupload__text"
                placeholder="Enter a caption..."
                onChange={event => setCaption(event.target.value)}
                value={caption}
            />
            <Button
                disabled={!caption}
                className="imageupload__button"
                variant="contained"
                component="label"
            >
                Upload
            <input
                    type="file"
                    onChange={handleUpload}
                    style={{ display: "none" }}
                />
            </Button>
            {progress > 0 ?
                <progress className="imageupload__progress" value={progress} max="100" /> :
                ""
            }
        </div>
    )
}

export default ImageUpload
