import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider} from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAgWlKG-iMCFWCWtfQ-MSzJUn522L9DJgI",
    authDomain: "pawtopia-71026.firebaseapp.com",
    projectId: "pawtopia-71026",
    storageBucket:  "pawtopia-71026.appspot.com",
    messagingSenderId: "873347534504",
    appId: "1:873347534504:web:a07b7b1d72963e79b3bc9d",
    measurementId: "G-RXW0SW3FJR"
  };
  

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const googleProvider = new GoogleAuthProvider();