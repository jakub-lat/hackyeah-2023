import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDApsJURk29Ab2Bs1UbpFlA64wiPPOITzY",
    authDomain: "hackyeah-829a0.firebaseapp.com",
    projectId: "hackyeah-829a0",
    storageBucket: "hackyeah-829a0.appspot.com",
    messagingSenderId: "545628285497",
    appId: "1:545628285497:web:e45a4cca5b6c0f16e13be8"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = getFirestore(app);