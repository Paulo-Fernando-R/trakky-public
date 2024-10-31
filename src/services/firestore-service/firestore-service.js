/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

/**
 * A function that stores data in the "logs" collection.
 *
 * @param {LogModel} log - The data to be stored in the collection.
 * @return {Promise<void>} A Promise that resolves after the data is stored successfully.
 */
async function storeData(log) {
    try {
        const docRef = await addDoc(collection(db, "logs"), log.toObj());
        console.info("firestoreService - storeData => Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e, "firestoreService - storeData");
    }
}

const firestoreService = {
    storeData,
};

export default firestoreService;
