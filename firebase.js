import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    getAuth
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const firebaseConfig = {

    apiKey: "AIzaSyD1Xo9gnW5TNv5JFOlhEJAg5PnLF9Rq0fI",

    authDomain: "jireth-terrenos-de-la-costa.firebaseapp.com",

    databaseURL: "https://jireth-terrenos-de-la-costa-default-rtdb.firebaseio.com",

    projectId: "jireth-terrenos-de-la-costa",

    storageBucket: "jireth-terrenos-de-la-costa.firebasestorage.app",

    messagingSenderId: "345030147050",

    appId: "1:345030147050:web:404186c333db8292995093"

};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);