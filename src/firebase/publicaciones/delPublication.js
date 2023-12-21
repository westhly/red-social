import { firebaseConfig } from "../firebase.js"
import { initializeApp } from "firebase/app";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

 const app = initializeApp(firebaseConfig);
 const  db = getFirestore(app)

export const delPublication = async(publications) => {
    try {
      await deleteDoc(doc(db, 'publications', `${publications.id}`))
      location.reload()
      return ''
    } catch (error) {
      console.log(error);
    }

  }

