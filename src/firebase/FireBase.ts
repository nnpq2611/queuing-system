// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLLN12UyFeCTOUqVQ4kkJw0SUMgjOvo4s",
  authDomain: "queuing-system-1e027.firebaseapp.com",
  databaseURL: "https://queuing-system-1e027-default-rtdb.firebaseio.com",
  projectId: "queuing-system-1e027",
  storageBucket: "queuing-system-1e027.appspot.com",
  messagingSenderId: "197748022254",
  appId: "1:197748022254:web:346569a2beb9cf6f8e4cff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export default database;