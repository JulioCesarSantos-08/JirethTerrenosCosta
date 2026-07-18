import "../firebase.js";

const loader = document.getElementById("loader");
const contenido = document.getElementById("contenido");

setTimeout(() => {

    loader.style.opacity = "0";
    loader.style.transition = ".6s";

    setTimeout(() => {

        loader.remove();

        contenido.classList.remove("oculto");

    },600);

},2400);