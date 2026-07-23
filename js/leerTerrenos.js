import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const grid = document.getElementById("gridTerrenos");

const mapaContenedor = document.getElementById("mapaTerrenos");

let mapaGeneral;

let limites;

const gridUbicaciones = document.getElementById("gridUbicaciones");

const imagenesMunicipios = {

    "Puerto Escondido":"imagenes/puerto.jpg",

    "Huatulco":"imagenes/huatulco.jpg",

    "Rio Grande":"imagenes/riogrande.jpg",

    "Pinotepa Nacional":"imagenes/pinotepa.jpg"

};

const municipios = {};

function crearCard(id, terreno){

    const imagen =

        terreno.multimedia?.carpeta &&
        terreno.multimedia?.portada

            ? `terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`

            : "imagenes/logo1.png";

    const estado = terreno.visible

        ? "Disponible"

        : "No disponible";

    return `

        <article class="cardTerreno">

            <div class="imagenTerreno">

                <img

                    src="${imagen}"

                    alt="${terreno.nombre}"

                    onerror="this.src='imagenes/logo1.png'"

                >

                <span class="estado disponible">

                    ${estado}

                </span>

            </div>

            <div class="contenidoTerreno">

                <span class="ubicacion">

                    📍 ${terreno.municipio}

                </span>

                <h3>

                    ${terreno.nombre}

                </h3>

                <div class="datosTerreno">

                    <span>

                        📐 ${terreno.metros} m²

                    </span>

                </div>

                <h4>

                    Desde $${Number(terreno.precio).toLocaleString("es-MX")}

                </h4>

                <a

                    href="terreno.html?id=${id}"

                    class="btnTerreno"

                >

                    Conocer propiedad

                </a>

            </div>

        </article>

    `;

}

function iniciarMapa(){

    if(!mapaContenedor){

        return;

    }

    mapaGeneral = L.map("mapaTerrenos").setView(

        [16.8609,-96.7842],

        8

    );

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            attribution:"© OpenStreetMap",

            maxZoom:20

        }

    ).addTo(mapaGeneral);

    limites = L.latLngBounds();

}

function crearMarcador(id, terreno){

    if(

        terreno.latitud == null ||

        terreno.longitud == null

    ){

        return;

    }

    const lat = Number(terreno.latitud);

    const lng = Number(terreno.longitud);

    limites.extend([lat,lng]);

    const imagen =

        terreno.multimedia?.carpeta &&

        terreno.multimedia?.portada

            ? `terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`

            : "imagenes/logo1.png";

    const precio = new Intl.NumberFormat(

        "es-MX",

        {

            style:"currency",

            currency:"MXN"

        }

    ).format(terreno.precio);

    const popup = `

        <div style="width:220px;">

            <img

                src="${imagen}"

                style="

                    width:100%;

                    height:130px;

                    object-fit:cover;

                    border-radius:10px;

                    margin-bottom:10px;

                "

            >

            <h3 style="margin-bottom:8px;">

                ${terreno.nombre}

            </h3>

            <p>

                📍 ${terreno.municipio}

            </p>

            <p>

                💰 ${precio}

            </p>

            <a

                href="terreno.html?id=${id}"

                style="

                    display:block;

                    margin-top:12px;

                    padding:10px;

                    text-align:center;

                    background:#0d6efd;

                    color:white;

                    border-radius:8px;

                    text-decoration:none;

                    font-weight:bold;

                "

            >

                Ver propiedad

            </a>

        </div>

    `;

    L.marker([lat,lng])

        .addTo(mapaGeneral)

        .bindPopup(popup);

}

function cargarUbicaciones(){

    if(!gridUbicaciones){

        return;

    }

    gridUbicaciones.innerHTML="";

    Object.entries(municipios).forEach(

        ([municipio,cantidad])=>{

            const imagen =

                imagenesMunicipios[municipio]

                ||

                "imagenes/logo1.png";

            gridUbicaciones.insertAdjacentHTML(

                "beforeend",

                `

<article

    class="cardUbicacion"

    onclick="window.location.href='terrenos.html?municipio=${encodeURIComponent(municipio)}'"

>

    <img src="${imagen}">

    <div>

        <h3>

            ${municipio}

        </h3>

        <span>

            ${cantidad}

            ${cantidad===1

                ? "propiedad"

                : "propiedades"}

        </span>

    </div>

</article>

                `

            );

        }

    );

}

async function leerTerrenos(){

    try{

       if(grid){

    grid.innerHTML = "";

}

        iniciarMapa();

        const snapshot = await getDocs(

            collection(db,"terrenos")

        );

        grid.innerHTML = "";

        if(snapshot.empty){

            grid.innerHTML = `

                <p class="sinDatos">

                    No hay terrenos disponibles.

                </p>

            `;

            return;

        }

        snapshot.forEach(documento=>{

            const terreno = documento.data();

            if(!terreno.visible){

                return;

            }

            const card = crearCard(

                documento.id,

                terreno

            );

            grid.insertAdjacentHTML(

                "beforeend",

                card

            );

            crearMarcador(

                documento.id,

                terreno

            );

            const municipio = terreno.municipio;

if(!municipios[municipio]){

    municipios[municipio]=0;

}

municipios[municipio]++;

        });

cargarUbicaciones();

        if(limites.isValid()){

            mapaGeneral.fitBounds(

                limites,

                {

                    padding:[60,60]

                }

            );

        }

    }

    catch(error){

        console.error(error);

    }

}

leerTerrenos();