import firebase from "firebase";

// Initialize Firebase
const firebaseApp = firebase.initializeApp({
    //Add firebase config here
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
