import { initializeApp } from 'firebase/app';
//import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Export Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
// Add other Firebase services as needed


