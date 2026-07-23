import { db } from "../firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const grid = document.getElementById("gridTerrenos");

const tituloPagina = document.getElementById("tituloPagina");

const descripcionPagina = document.getElementById("descripcionPagina");

const filtroMunicipio = document.getElementById("filtroMunicipio");

const buscar = document.getElementById("buscar");

const filtroTipo = document.getElementById("filtroTipo");

const ordenar = document.getElementById("ordenar");

const parametros = new URLSearchParams(window.location.search);

const municipioURL = parametros.get("municipio");

let terrenos = [];

function crearCard(id, terreno){

    const imagen =

        terreno.multimedia?.carpeta &&
        terreno.multimedia?.portada

            ? `terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`

            : "imagenes/logo1.png";

    const estado =

        terreno.visible

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

        <span class="estado">

            ${estado}

        </span>

    </div>

    <div class="contenidoTerreno">

        <span class="tipo">

            ${terreno.tipo}

        </span>

        <h3 class="nombreTerreno">

            ${terreno.nombre}

        </h3>

        <p class="descripcion">

            ${terreno.descripcion.substring(0,90)}...

        </p>

        <div class="precio">

            ${Number(terreno.precio).toLocaleString("es-MX")}

        </div>

        <div class="infoTerreno">

            <div class="info">

                <span>Municipio</span>

                <strong>${terreno.municipio}</strong>

            </div>

            <div class="info">

                <span>Superficie</span>

                <strong>${terreno.metros} m²</strong>

            </div>

        </div>

        <a
            href="terreno.html?id=${id}"
            class="botonTerreno"
        >

            Ver propiedad →

        </a>

    </div>

</article>

`;

}

function mostrarTerrenos(lista){

    grid.innerHTML = "";

    if(lista.length===0){

        grid.innerHTML = `

            <p class="sinDatos">

                No se encontraron terrenos.

            </p>

        `;

        return;

    }

    lista.forEach(terreno=>{

        grid.insertAdjacentHTML(

            "beforeend",

            crearCard(

                terreno.id,

                terreno

            )

        );

    });

}

function cargarMunicipios(){

    if(!filtroMunicipio){

        return;

    }

    const municipios = [

        ...new Set(

            terrenos.map(

                terreno=>terreno.municipio

            )

        )

    ].sort();

    filtroMunicipio.innerHTML = `

        <option value="">

            Todos los municipios

        </option>

    `;

    municipios.forEach(municipio=>{

        filtroMunicipio.insertAdjacentHTML(

            "beforeend",

            `

                <option value="${municipio}">

                    ${municipio}

                </option>

            `

        );

    });

}

function cargarTipos(){

    if(!filtroTipo){

        return;

    }

    const tipos = [

        ...new Set(

            terrenos.map(

                terreno=>terreno.tipo

            )

        )

    ].sort();

    filtroTipo.innerHTML = `

        <option value="">

            Todos los tipos

        </option>

    `;

    tipos.forEach(tipo=>{

        filtroTipo.insertAdjacentHTML(

            "beforeend",

            `

                <option value="${tipo}">

                    ${tipo}

                </option>

            `

        );

    });

}



function aplicarFiltros(){

    let lista = [...terrenos];

    if(filtroMunicipio.value){

        lista = lista.filter(

            terreno =>

                terreno.municipio === filtroMunicipio.value

        );

    }

    if(buscar.value.trim()){

    const texto = buscar.value.toLowerCase();

    lista = lista.filter(

        terreno =>

            terreno.nombre.toLowerCase().includes(texto)

            ||

            terreno.municipio.toLowerCase().includes(texto)

            ||

            terreno.descripcion.toLowerCase().includes(texto)

    );

}

    if(filtroTipo.value){

    lista = lista.filter(

        terreno=>

            terreno.tipo===filtroTipo.value

    );

}
 
    if(ordenar.value==="precioAsc"){

    lista.sort(

        (a,b)=>

            Number(a.precio)-Number(b.precio)

    );

}

else if(ordenar.value==="precioDesc"){

    lista.sort(

        (a,b)=>

            Number(b.precio)-Number(a.precio)

    );

}

else if(ordenar.value==="metrosAsc"){

    lista.sort(

        (a,b)=>

            Number(a.metros)-Number(b.metros)

    );

}

else if(ordenar.value==="metrosDesc"){

    lista.sort(

        (a,b)=>

            Number(b.metros)-Number(a.metros)

    );

}

    mostrarTerrenos(lista);

    if(filtroMunicipio.value){

        tituloPagina.textContent =

            `Terrenos en ${filtroMunicipio.value}`;

        descripcionPagina.textContent =

            `Actualmente contamos con ${lista.length} propiedades disponibles en ${filtroMunicipio.value}.`;

    }

    else{

        tituloPagina.textContent =

            "Todos nuestros terrenos";

        descripcionPagina.textContent =

            `Actualmente contamos con ${lista.length} propiedades disponibles.`;

    }

}

async function leerTerrenos(){

    try{

        terrenos = [];

        const snapshot = await getDocs(

            collection(db,"terrenos")

        );

        snapshot.forEach(documento=>{

            const terreno = documento.data();

            if(!terreno.visible){

                return;

            }

            terrenos.push({

                id:documento.id,

                ...terreno

            });

        });

        cargarMunicipios();

        cargarTipos();

        let lista = [...terrenos];

        if(municipioURL){

            filtroMunicipio.value = municipioURL;

            lista = lista.filter(

                terreno=>

                    terreno.municipio===municipioURL

            );

            tituloPagina.textContent =

                `Terrenos en ${municipioURL}`;

            descripcionPagina.textContent =

                `Actualmente contamos con ${lista.length} propiedades disponibles en ${municipioURL}.`;

        }

        else{

            tituloPagina.textContent =

                "Todos nuestros terrenos";

            descripcionPagina.textContent =

                `Actualmente contamos con ${lista.length} propiedades disponibles.`;

        }

        mostrarTerrenos(lista);

        aplicarFiltros();

        console.log(terrenos);

    }

    catch(error){

        console.error(error);

    }

}

filtroMunicipio.addEventListener(

    "change",

    aplicarFiltros

);

buscar.addEventListener(

    "input",

    aplicarFiltros

);

filtroTipo.addEventListener(

    "change",

    aplicarFiltros

);

ordenar.addEventListener(

    "change",

    aplicarFiltros

);

leerTerrenos();