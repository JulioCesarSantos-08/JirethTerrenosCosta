import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const grid = document.getElementById("gridTerrenos");

function crearCard(id, terreno) {

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
                    onerror="this.src='imagenes/logo1.png'">

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
                    class="btnTerreno">

                    Conocer propiedad

                </a>

            </div>

        </article>

    `;

}

async function leerTerrenos() {

    try {

        if (!grid) return;

        const snapshot = await getDocs(collection(db, "terrenos"));

        grid.innerHTML = "";

        if (snapshot.empty) {

            grid.innerHTML = `

                <p class="sinDatos">

                    No hay terrenos disponibles.

                </p>

            `;

            return;

        }

        snapshot.forEach(doc => {

            const terreno = doc.data();

            if (!terreno.visible) return;

            const card = crearCard(doc.id, terreno);

            grid.insertAdjacentHTML("beforeend", card);

        });

    }

    catch (error) {

        console.error(error);

    }

}

leerTerrenos();