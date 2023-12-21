import { firebaseConfig } from "../firebase.js"
import { initializeApp } from "firebase/app";

import {addDoc, collection, getFirestore } from "firebase/firestore";

 const app = initializeApp(firebaseConfig);
 const  db = getFirestore(app)

export const createPost = async (publication) => {
    try {
        await addDoc(collection(db, "publications"), publication);
        window.location.reload()
        
    } catch (error) {
        console.log(error);
    }
}

