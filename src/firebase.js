// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDmoVdzg6TkgkBR0-CmNFUUxmS-CFVstvg",
  authDomain: "ai-travel-planner-1cb78.firebaseapp.com",
  projectId: "ai-travel-planner-1cb78",
  storageBucket: "ai-travel-planner-1cb78.firebasestorage.app",
  messagingSenderId: "673317630463",
  appId: "1:673317630463:web:ecf6bd1b43a355f51077ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;