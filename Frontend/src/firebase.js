import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,deleteUser ,signInWithPopup,GoogleAuthProvider,GithubAuthProvider,onAuthStateChanged ,signOut} from "firebase/auth";
import { getFirestore,setDoc, doc, getDoc, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsNlltpiZjBtaCoAOfiJSCAXHr9Wxlz3o",
  authDomain: "cloud-ideauth.firebaseapp.com",
  projectId: "cloud-ideauth",
  storageBucket: "cloud-ideauth.appspot.com", // ✅ FIXED
  messagingSenderId: "905702853798",
  appId: "1:905702853798:web:c9c1296efb4cd5a8693867",
  measurementId: "G-34367G17KJ",
  databaseURL: "https://cloud-ideauth-default-rtdb.firebaseio.com", // ✅ Correct
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db,setDoc, deleteUser, createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,GithubAuthProvider,signOut,onAuthStateChanged, collection, addDoc, getFirestore, doc, getDoc,};


