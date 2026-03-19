import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDYarEvotggk8bUEAs8njr_cjErtCF17g",
  authDomain: "bloom-app-9246e.firebaseapp.com",
  projectId: "bloom-app-9246e",
  storageBucket: "bloom-app-9246e.firebasestorage.app",
  messagingSenderId: "203914130711",
  appId: "1:203914130711:web:b1745c39aaa161263a7352",
  measurementId: "G-LC9XDVLWTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// Prevent infinite hanging if Firebase rules are missing/blocking
storage.maxUploadRetryTime = 10000;
storage.maxOperationRetryTime = 10000;

// Check if we are in a browser environment before initializing analytics
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}
export { analytics };

export default app;
