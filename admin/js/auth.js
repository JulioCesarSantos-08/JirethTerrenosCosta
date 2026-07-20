import { auth } from "../../firebase.js";

import {

    signInWithEmailAndPassword,

    sendPasswordResetEmail,

    signOut,

    onAuthStateChanged

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

export async function iniciarSesion(correo,password){

    return await signInWithEmailAndPassword(auth,correo,password);

}

export async function recuperarPassword(correo){

    return await sendPasswordResetEmail(auth,correo);

}

export async function cerrarSesion(){

    return await signOut(auth);

}

export function verificarSesion(callback){

    onAuthStateChanged(auth,callback);

}