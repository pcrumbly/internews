// Import core Firebase services
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";

// Import FirebaseUI and its styles
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDqiApJAU_lAY_412wN4QYmx2KhwkSsxJw",
    authDomain: "internews-f9904.firebaseapp.com",
    projectId: "internews-f9904",
    storageBucket: "internews-f9904.appspot.com",
    messagingSenderId: "991948497795",
    appId: "1:991948497795:web:2477c4be184a12388dccb6",
    measurementId: "G-VBETF85Z48"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);

// FirebaseUI config
export const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/profile',  // URL to redirect to on successful sign-in
    signInOptions: [
        // List the authentication providers you want to support for registration
        'password',
        // ... other providers
    ],
    callbacks: {
        signInSuccessWithAuthResult: () => false
    }
};


// Initialize FirebaseUI
export const ui = new firebaseui.auth.AuthUI(auth);
