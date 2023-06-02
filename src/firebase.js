import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyAWF2kxXg30ItzOKf60jGxg5ESCpmage94",
    authDomain: "software-weirdo.firebaseapp.com",
    projectId: "software-weirdo",
    storageBucket: "software-weirdo.appspot.com",
    messagingSenderId: "74322838419",
    appId: "1:74322838419:web:98d30e94bbb09b876e1e66",
    measurementId: "G-EEHG1CLM33"
};

const db = initializeApp(firebaseConfig);
const storage = getStorage(db);

export { db, storage };
