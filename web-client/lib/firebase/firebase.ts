// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getDoc, getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { Image } from "@/ts/types/Image";
import { User as FirebaseUser } from "@/ts/types/User";
import { FormData } from "@/ts/types/FormData";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDY485ZI_q0tjC-hOC7I3dsxftuPHIRbXE",
    authDomain: "image-sharing-ecb3d.firebaseapp.com",
    projectId: "image-sharing-ecb3d",
    appId: "1:263937146384:web:58073c51bc627c6c215495",
    measurementId: "G-7T44HM8TEW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export const functions = getFunctions();

// Initialize Auth
const auth = getAuth(app);

// Auth functions
export function signInWithGoogle() {
    return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
    return auth.signOut();
}

export function onAuthStateChangedHelper(
    callback: (user: User | null) => void
) {
    return onAuthStateChanged(auth, callback);
}

// Firestore functions
export async function createImageDoc(id: string, data: FormData) {
    const imagesRef = doc(firestore, "images", id);
    setDoc(
        imagesRef,
        {
            title: data.title,
            description: data.description,
            category: data.category,
        },
        { merge: true }
    );
}

export async function getUserData(id: string) {
    const userRef = doc(firestore, "users", id);
    const docSnap = await getDoc(userRef);

    return docSnap.data() as FirebaseUser;
}
