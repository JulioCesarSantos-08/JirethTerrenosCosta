import { cerrarSesion } from "./auth.js";

import { db } from "../../firebase.js";

import {

    collection,
    onSnapshot,
    query,
    orderBy,
    limit

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const btnCerrarSesion = document.getElementById("btnCerrarSesion");

const totalTerrenos = document.getElementById("totalTerrenos");

const publicados = document.getElementById("publicados");

const destacados = document.getElementById("destacados");

const ocultos = document.getElementById("ocultos");

const ultimosTerrenos = document.getElementById("ultimosTerrenos");

function cargarDashboard(){

    onSnapshot(

        collection(db,"terrenos"),

        snapshot=>{

            let total = 0;
            let visibles = 0;
            let ocultosTotal = 0;
            let destacadosTotal = 0;

            snapshot.forEach(documento=>{

                const terreno = documento.data();

                total++;

                if(terreno.visible){

                    visibles++;

                }else{

                    ocultosTotal++;

                }

                if(terreno.destacado){

                    destacadosTotal++;

                }

            });

            totalTerrenos.textContent = total;

            publicados.textContent = visibles;

            destacados.textContent = destacadosTotal;

            ocultos.textContent = ocultosTotal;

        }

    );

}

function cargarUltimosTerrenos(){

    const consulta = query(

        collection(db,"terrenos"),

        orderBy("fechaCreacion","desc"),

        limit(5)

    );

    onSnapshot(consulta,(snapshot)=>{

        if(snapshot.empty){

            ultimosTerrenos.innerHTML = `

                <div class="sinDatosDashboard">

                    Todavía no hay terrenos registrados.

                </div>

            `;

            return;

        }

        ultimosTerrenos.innerHTML = "";

        snapshot.forEach(documento=>{

            const terreno = documento.data();

            const portada =

                terreno.multimedia?.carpeta &&
                terreno.multimedia?.portada

                ? `../../terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`

                : "../../imagenes/logo1.png";

            const precio = new Intl.NumberFormat(

                "es-MX",

                {

                    style:"currency",

                    currency:"MXN"

                }

            ).format(terreno.precio);

            const estado = terreno.visible

                ? "🟢 Visible"

                : "🔴 Oculto";

            ultimosTerrenos.innerHTML += `

                <div class="terrenoDashboard">

                    <img
                        src="${portada}"
                        onerror="this.src='../../imagenes/logo1.png'">

                    <div class="infoTerreno">

                        <h3>${terreno.nombre}</h3>

                        <p>

                            <i class="fa-solid fa-location-dot"></i>

                            ${terreno.municipio}

                        </p>

                        <strong>${precio}</strong>

                        <span>${estado}</span>

                    </div>

                </div>

            `;

        });

    });

}

btnCerrarSesion.addEventListener("click", async()=>{

    await cerrarSesion();

    location.replace("login.html");

});

cargarDashboard();

cargarUltimosTerrenos();