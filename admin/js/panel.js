import { cerrarSesion } from "./auth.js";

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

btnCerrarSesion.addEventListener("click", async () => {

    await cerrarSesion();

    location.replace("login.html");

});