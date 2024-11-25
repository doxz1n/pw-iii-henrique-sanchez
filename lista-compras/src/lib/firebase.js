import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAUPny1J7lFfLiiDhiLkYaBGXTndo_ktLQ",
  authDomain: "meuprimeirofirebase-3aee1.firebaseapp.com",
  projectId: "meuprimeirofirebase-3aee1",
  storageBucket: "meuprimeirofirebase-3aee1.firebasestorage.app",
  messagingSenderId: "730116861460",
  appId: "1:730116861460:web:a84db6abb79379a5804101"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}