import { initializeApp } from "firebase/app";
import { getFirestore}   from "firebase/firestore"
import {getAuth} from "firebase/auth"
//require ('dotenv').config()


const firebaseConfig = {
    apiKey: "AIzaSyCJ9LsMUh_IH4rv3oIIEOCuRRMOv3nSdIA",
    authDomain: "dbest-note-app-56d6f.firebaseapp.com",
    databaseURL: "https://dbest-note-app-56d6f-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dbest-note-app-56d6f",
    storageBucket: "dbest-note-app-56d6f.appspot.com",
    messagingSenderId: "940994556206",
    appId: "1:940994556206:web:98a66fb6dd08c8fdf34abf"
  };
  
const app = initializeApp(firebaseConfig);

//init services
export const auth = getAuth()
export const db = getFirestore(app)


