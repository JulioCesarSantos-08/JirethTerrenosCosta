const btnSeleccionarCarpeta = document.getElementById("btnSeleccionarCarpeta");
const selectorCarpeta = document.getElementById("selectorCarpeta");
const inputCarpeta = document.getElementById("carpeta");

const galeriaImagenes = document.getElementById("galeriaImagenes");
const listaVideos = document.getElementById("listaVideos");
const listaDocumentos = document.getElementById("listaDocumentos");

const multimedia = {

    carpeta: "",

    portada: "",

    imagenes: [],

    videos: [],

    documentos: []

};

window.multimedia = multimedia;

function limpiarMultimediaUI(){

    galeriaImagenes.innerHTML="";
    listaVideos.innerHTML="";
    listaDocumentos.innerHTML="";

}

function rutaArchivo(nombre){

    return `../../terrenos/${multimedia.carpeta}/${nombre}`;

}

btnSeleccionarCarpeta.addEventListener("click", () => {
    selectorCarpeta.click();
});

selectorCarpeta.addEventListener("change", (e) => {

    const archivos = [...e.target.files];

    if (!archivos.length) return;

const nombreCarpeta = archivos[0].webkitRelativePath.split("/")[0];

inputCarpeta.value = nombreCarpeta;

multimedia.carpeta = nombreCarpeta;

multimedia.portada = "";

multimedia.imagenes = [];

multimedia.videos = [];

multimedia.documentos = [];

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

const check = card.querySelector("input[type='checkbox']");

boton.addEventListener("click", () => {

    document
        .querySelectorAll(".btnPortada")
        .forEach(btn => {

            btn.classList.remove("activa");
            btn.textContent = "⭐ Portada";

        });

    boton.classList.add("activa");
    boton.textContent = "⭐ Portada seleccionada";

    multimedia.portada = archivo.name;

});

check.addEventListener("change",()=>{

    imagen.publicar = check.checked;

});

const imagen = {

    archivo: archivo.name,

    publicar: true

};

multimedia.imagenes.push(imagen);

        galeriaImagenes.appendChild(card);

    };

    lector.readAsDataURL(archivo);

}

function mostrarImagenGuardada(imagen){

    const card=document.createElement("div");

    card.className="tarjetaImagen";

    const esPortada=multimedia.portada===imagen.archivo;

    card.innerHTML=`

        <img src="../../terrenos/${multimedia.carpeta}/${imagen.archivo}">

        <div class="accionesImagen">

            <label>

                <input
                    type="checkbox"
                    ${imagen.publicar ? "checked" : ""}>

                Mostrar

            </label>

            <button
                type="button"
                class="btnPortada ${esPortada ? "activa" : ""}">

                ${esPortada ? "⭐ Portada seleccionada" : "⭐ Portada"}

            </button>

        </div>

    `;

    const boton=card.querySelector(".btnPortada");
    const check=card.querySelector("input");

    boton.onclick=()=>{

        document
            .querySelectorAll(".btnPortada")
            .forEach(btn=>{

                btn.classList.remove("activa");
                btn.textContent="⭐ Portada";

            });

        boton.classList.add("activa");
        boton.textContent="⭐ Portada seleccionada";

        multimedia.portada=imagen.archivo;

    };

    check.onchange=()=>{

        imagen.publicar=check.checked;

    };

    galeriaImagenes.appendChild(card);

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

    const video = {

    archivo: archivo.name,

    publicar: true

};

multimedia.videos.push(video);

const check = div.querySelector("input[type='checkbox']");

check.addEventListener("change",()=>{

    video.publicar = check.checked;

});

    listaVideos.appendChild(div);

}

function mostrarVideoGuardado(video){

    const div = document.createElement("div");

    div.className = "archivo";

    div.innerHTML = `
        <span>🎥 ${video.archivo}</span>

        <label>
            <input
                type="checkbox"
                ${video.publicar ? "checked" : ""}>
            Publicar
        </label>
    `;

    const check = div.querySelector("input");

    check.addEventListener("change",()=>{

        video.publicar = check.checked;

    });

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

    const documento = {

        archivo: archivo.name,

        titulo: "",

        publicar: true

    };

    multimedia.documentos.push(documento);

    const inputTitulo = div.querySelector("input[type='text']");

    inputTitulo.addEventListener("input", () => {

        documento.titulo = inputTitulo.value.trim();

    });

    const check = div.querySelector("input[type='checkbox']");

    check.addEventListener("change", () => {

        documento.publicar = check.checked;

    });

    listaDocumentos.appendChild(div);

}

function mostrarDocumentoGuardado(documento){

    const div = document.createElement("div");

    div.className = "archivo";

    div.innerHTML = `

        <div>

            <strong>📄 ${documento.archivo}</strong>

        </div>

        <div>

            <input
                type="text"
                value="${documento.titulo ?? ""}"
                placeholder="Título público">

        </div>

        <label>

            <input
                type="checkbox"
                ${documento.publicar ? "checked" : ""}>

            Publicar

        </label>

    `;

    const inputTitulo = div.querySelector("input[type='text']");
    const check = div.querySelector("input[type='checkbox']");

    inputTitulo.addEventListener("input",()=>{

        documento.titulo = inputTitulo.value.trim();

    });

    check.addEventListener("change",()=>{

        documento.publicar = check.checked;

    });

    listaDocumentos.appendChild(div);

}

window.cargarMultimedia = function(datos){

    multimedia.carpeta = datos.carpeta ?? "";
    multimedia.portada = datos.portada ?? "";

    multimedia.imagenes = structuredClone(datos.imagenes ?? []);
    multimedia.videos = structuredClone(datos.videos ?? []);
    multimedia.documentos = structuredClone(datos.documentos ?? []);

    inputCarpeta.value = multimedia.carpeta;

    limpiarMultimediaUI();

multimedia.imagenes.forEach(mostrarImagenGuardada);

multimedia.videos.forEach(mostrarVideoGuardado);

multimedia.documentos.forEach(mostrarDocumentoGuardado);

};