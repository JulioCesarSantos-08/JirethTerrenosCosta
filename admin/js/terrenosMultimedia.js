const btnSeleccionarCarpeta = document.getElementById("btnSeleccionarCarpeta");
const selectorCarpeta = document.getElementById("selectorCarpeta");
const inputCarpeta = document.getElementById("carpeta");

const galeriaImagenes = document.getElementById("galeriaImagenes");
const listaVideos = document.getElementById("listaVideos");
const listaDocumentos = document.getElementById("listaDocumentos");

btnSeleccionarCarpeta.addEventListener("click", () => {
    selectorCarpeta.click();
});

selectorCarpeta.addEventListener("change", (e) => {

    const archivos = [...e.target.files];

    if (!archivos.length) return;

    const nombreCarpeta = archivos[0].webkitRelativePath.split("/")[0];

    inputCarpeta.value = nombreCarpeta;

    galeriaImagenes.innerHTML = "";
    listaVideos.innerHTML = "";
    listaDocumentos.innerHTML = "";

    archivos.forEach(archivo => {

        if (archivo.type.startsWith("image/")) {

            mostrarImagen(archivo);

        } else if (archivo.type.startsWith("video/")) {

            mostrarVideo(archivo);

        } else if (archivo.name.toLowerCase().endsWith(".pdf")) {

            mostrarDocumento(archivo);

        }

    });

});

function mostrarImagen(archivo) {

    const lector = new FileReader();

    lector.onload = e => {

        const card = document.createElement("div");

        card.className = "tarjetaImagen";

card.innerHTML = `

    <img src="${e.target.result}">

    <div class="accionesImagen">

        <label>

            <input
                type="checkbox"
                checked>

            Mostrar

        </label>

        <button
            type="button"
            class="btnPortada">

            ⭐ Portada

        </button>

    </div>

`;

const boton = card.querySelector(".btnPortada");

boton.addEventListener("click", () => {

    document
        .querySelectorAll(".btnPortada")
        .forEach(btn => {

            btn.classList.remove("activa");
            btn.textContent = "⭐ Portada";

        });

    boton.classList.add("activa");
    boton.textContent = "⭐ Portada seleccionada";

});

        galeriaImagenes.appendChild(card);

    };

    lector.readAsDataURL(archivo);

}

function mostrarVideo(archivo) {

    const div = document.createElement("div");

    div.className = "archivo";

    div.innerHTML = `
        <span>🎥 ${archivo.name}</span>

        <label>
            <input type="checkbox" checked>
            Publicar
        </label>
    `;

    listaVideos.appendChild(div);

}

function mostrarDocumento(archivo) {

    const div = document.createElement("div");

    div.className = "archivo";

div.innerHTML = `

<div>

    <strong>📄 ${archivo.name}</strong>

</div>

<div>

    <input
        type="text"
        placeholder="Título público">

</div>

<label>

    <input
        type="checkbox"
        checked>

    Publicar

</label>

`;

    listaDocumentos.appendChild(div);

}