
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

export const firebaseConfig = {
  apiKey: "AIzaSyD02Ktlfy2VMjz9ZWN6vfWowzCN4m6uncs",
  authDomain: "my-project-2ae53.firebaseapp.com",
  projectId: "my-project-2ae53",
  storageBucket: "my-project-2ae53.appspot.com",
  messagingSenderId: "666336453389",
  appId: "1:666336453389:web:0e61b5adc2abe9fe9c4644"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)