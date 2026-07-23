import { db } from "../firebase.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const parametros = new URLSearchParams(window.location.search);

const idTerreno = parametros.get("id");

const imagenPrincipal = document.getElementById("imagenPrincipal");

const miniaturas = document.getElementById("miniaturas");

const estado = document.getElementById("estado");

const nombre = document.getElementById("nombre");

const municipio = document.getElementById("municipio");

const precio = document.getElementById("precio");

const metros = document.getElementById("metros");

const tipo = document.getElementById("tipo");

const descripcion = document.getElementById("descripcion");

const videos = document.getElementById("videos");

const documentos = document.getElementById("documentos");

const btnWhatsapp = document.getElementById("btnWhatsapp");

let mapa;

let marcador;

let terrenoActual = null;

async function iniciar(){

    if(!idTerreno){

        mostrarError("No se recibió el identificador del terreno.");

        return;

    }

    await cargarTerreno();

}

async function cargarTerreno(){

    try{

        const referencia = doc(db,"terrenos",idTerreno);

        const documento = await getDoc(referencia);

        if(!documento.exists()){

            mostrarError("El terreno ya no existe.");

            return;

        }

        terrenoActual = documento.data();

mostrarInformacion();

cargarGaleria();

cargarMapa();

    }

    catch(error){

        console.error(error);

        mostrarError("Ocurrió un error al cargar el terreno.");

    }

    function cargarGaleria(){

    if(!terrenoActual.multimedia) return;

    const carpeta = terrenoActual.multimedia.carpeta;

    const portada = terrenoActual.multimedia.portada;

    const imagenes = terrenoActual.multimedia.imagenes
        .filter(imagen => imagen.publicar);

    if(imagenes.length===0){

        imagenPrincipal.src="imagenes/logo1.png";

        return;

    }

    miniaturas.innerHTML="";

    let imagenInicial = portada;

    if(!imagenInicial){

        imagenInicial = imagenes[0].archivo;

    }

    imagenPrincipal.src = `terrenos/${carpeta}/${imagenInicial}`;

    imagenes.forEach(imagen=>{

        const img=document.createElement("img");

        img.src=`terrenos/${carpeta}/${imagen.archivo}`;

        img.alt=terrenoActual.nombre;

        img.onclick=()=>{

            imagenPrincipal.src=img.src;

        };

        miniaturas.appendChild(img);

    });

}

function cargarMapa(){

    if(
        terrenoActual.latitud==null ||
        terrenoActual.longitud==null
    ){
        return;
    }

    const lat = Number(terrenoActual.latitud);

    const lng = Number(terrenoActual.longitud);

    mapa = L.map("mapaTerreno").setView([lat,lng],16);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:"© OpenStreetMap",

            maxZoom:20

        }

    ).addTo(mapa);

    marcador = L.marker([lat,lng]).addTo(mapa);

    marcador.bindPopup(`

        <strong>${terrenoActual.nombre}</strong>

        <br>

        ${terrenoActual.municipio}

    `);

}

}

function mostrarInformacion(){

    estado.textContent = terrenoActual.visible
        ? "Disponible"
        : "No disponible";

    estado.classList.remove("disponible","nodisponible");

    estado.classList.add(

        terrenoActual.visible
            ? "disponible"
            : "nodisponible"

    );

    nombre.textContent = terrenoActual.nombre;

    municipio.textContent = "📍 " + terrenoActual.municipio;

    precio.textContent = new Intl.NumberFormat(

        "es-MX",

        {
            style:"currency",
            currency:"MXN"
        }

    ).format(terrenoActual.precio);

    metros.textContent = terrenoActual.metros + " m²";

    tipo.textContent = terrenoActual.tipo;

    descripcion.textContent = terrenoActual.descripcion;

}

function mostrarError(mensaje){

    document.body.innerHTML = `

        <div style="

            min-height:100vh;

            display:flex;

            justify-content:center;

            align-items:center;

            font-size:22px;

            font-weight:bold;

            padding:40px;

            text-align:center;

        ">

            ${mensaje}

        </div>

    `;

}

iniciar();

