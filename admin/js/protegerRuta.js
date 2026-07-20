import { verificarSesion } from "./auth.js";

verificarSesion((user)=>{

    if(!user){

        location.replace("login.html");

        return;

    }

});