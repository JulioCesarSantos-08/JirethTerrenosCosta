import {

    iniciarSesion,

    recuperarPassword

} from "./auth.js";

const form=document.getElementById("formLogin");

const correo=document.getElementById("correo");

const password=document.getElementById("password");

const mensaje=document.getElementById("mensaje");

const btnMostrar=document.getElementById("btnMostrar");

const btnRecuperar=document.getElementById("btnRecuperar");

btnMostrar.addEventListener("click",()=>{

    password.type=password.type==="password"

    ?"text"

    :"password";

});

form.addEventListener("submit",async(e)=>{

    e.preventDefault();

    mensaje.textContent="";

    if(correo.value.trim()===""){

        mensaje.textContent="Ingrese su correo.";

        return;

    }

    if(password.value.trim()===""){

        mensaje.textContent="Ingrese su contraseña.";

        return;

    }

    try{

        await iniciarSesion(

            correo.value,

            password.value

        );

        location.href="panel.html";

    }

    catch(error){

        mensaje.textContent="Correo o contraseña incorrectos.";

    }

});

btnRecuperar.addEventListener("click",async()=>{

    if(correo.value.trim()===""){

        mensaje.textContent="Escriba primero su correo.";

        return;

    }

    try{

        await recuperarPassword(correo.value);

        mensaje.style.color="#2E7D32";

        mensaje.textContent="Se envió un correo para restablecer la contraseña.";

    }

    catch(error){

        mensaje.style.color="#C62828";

        mensaje.textContent="No fue posible enviar el correo.";

    }

});