// Packages
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    // Get BrokenGM app setup and added here
};

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)