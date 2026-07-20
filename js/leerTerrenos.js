import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const grid = document.getElementById("gridTerrenos");

function crearCard(id, terreno) {

    return `

        <article class="cardTerreno">

            <div class="imagenTerreno">

                <img src="terrenos/${terreno.carpeta}/img1.png" alt="${terreno.nombre}">

                <span class="estado disponible">

                    ${terreno.estado}

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

        console.log("GRID:", grid);

        if (!grid) {

            console.error("No existe el contenedor #gridTerrenos");

            return;

        }

        const snapshot = await getDocs(collection(db, "terrenos"));

        console.log("Documentos encontrados:", snapshot.size);

        grid.innerHTML = "";

        snapshot.forEach(doc => {

            const terreno = doc.data();

            console.log("Terreno:", terreno);

            const card = crearCard(doc.id, terreno);

            grid.insertAdjacentHTML("beforeend", card);

        });

    }

    catch (error) {

        console.error("Error al leer terrenos:", error);

    }

}

leerTerrenos();