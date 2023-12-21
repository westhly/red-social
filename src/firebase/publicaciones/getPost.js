import { firebaseConfig } from "../firebase.js";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const getPost = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "publications"));

    let data = [];

    for (let i = 0; i < querySnapshot.docs.length; i++) {
      let post = querySnapshot.docs[i].data();
      post.id = querySnapshot.docs[i].id;
      data.push(post);
    }

    return data;
  } catch (error) {
    console.log(error);
  }
};
