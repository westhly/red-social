import { firebaseConfig } from "../firebase.js"
import { initializeApp } from "firebase/app";
import { reload } from "firebase/auth";
import {addDoc, collection, getFirestore } from "firebase/firestore";

 const app = initializeApp(firebaseConfig);
 const  db = getFirestore(app)

export const createPost = async (publication) => {
    try {
        await addDoc(collection(db, "publications"), publication);
        console.log('publicado');
        window.location.reload()
        
    } catch (error) {
        console.log(error);
    }
}

