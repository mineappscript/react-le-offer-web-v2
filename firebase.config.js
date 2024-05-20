
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyBkdRFTGlUexHX52RHtZcpgah0NS6dXavc",
//   authDomain: "leoffer-aca49.firebaseapp.com",
//   projectId: "leoffer-aca49",
//   storageBucket: "leoffer-aca49.appspot.com",
//   messagingSenderId: "1079514077363",
//   appId: "1:1079514077363:web:a2bcb2908b2a62b40338c6",
//   measurementId: "G-8C3ERLL1VS"
// };

const firebaseConfig = {
  // apiKey: "AIzaSyBkdRFTGlUexHX52RHtZcpgah0NS6dXavc",
  // authDomain: "leoffer-aca49.firebaseapp.com",
  // projectId: "leoffer-aca49",
  // storageBucket: "leoffer-aca49.appspot.com",
  // messagingSenderId: "1079514077363",
  // appId: "1:1079514077363:web:0258195a7ca5f0dc0338c6",
  // measurementId: "G-6SCJ5HFRHQ"
  apiKey: "AIzaSyDxmLkVbKrGcRRkbEW7wf4lerxxK3Bxu_A",
  authDomain: "leoffer-aca49.firebaseapp.com",
  projectId: "leoffer-aca49",
  storageBucket: "leoffer-aca49.appspot.com",
  messagingSenderId: "1079514077363",
  appId: "1:1079514077363:web:6a0c0ca604b996830338c6",
  measurementId: "G-LYBZTN24XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export  const auth = getAuth(app)
