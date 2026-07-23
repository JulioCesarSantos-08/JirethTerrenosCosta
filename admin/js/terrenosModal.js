const modal = document.getElementById("modalTerreno");

const btnNuevo = document.getElementById("btnNuevo");

const cerrar = document.getElementById("cerrarModal");

const pasos = document.querySelectorAll(".paso");

const tabs = document.querySelectorAll(".tab");

const btnAnterior = document.getElementById("btnAnterior");

const btnSiguiente = document.getElementById("btnSiguiente");

const tituloModal = document.getElementById("tituloModal");

let pasoActual = 0;

function actualizarWizard() {

    pasos.forEach((paso, index) => {

        paso.classList.toggle("activo", index === pasoActual);

    });

    tabs.forEach((tab, index) => {

        tab.classList.toggle("activa", index === pasoActual);

    });

    btnAnterior.style.visibility =

        pasoActual === 0

            ? "hidden"

            : "visible";

    if (pasoActual === 2) {

        btnSiguiente.textContent =

            window.modoTerreno === "editar"

                ? "Guardar Cambios"

                : "Guardar Terreno";

    } else {

        btnSiguiente.textContent = "Siguiente";

    }

}

function limpiarFormulario() {

    document.getElementById("nombreTerreno").value = "";

    document.getElementById("municipio").value = "";

    document.getElementById("tipo").value = "";

    document.getElementById("precio").value = "";

    document.getElementById("metros").value = "";

    document.getElementById("descripcion").value = "";

    document.getElementById("visible").checked = true;

    document.getElementById("destacado").checked = false;

    document.getElementById("latitud").value = "";

    document.getElementById("longitud").value = "";

    if (window.multimedia) {

        window.multimedia.carpeta = "";

        window.multimedia.portada = "";

        window.multimedia.imagenes = [];

        window.multimedia.videos = [];

        window.multimedia.documentos = [];

    }

}

function abrirModalCrear() {

    window.modoTerreno = "crear";

    window.idTerrenoEditando = null;

    pasoActual = 0;

    limpiarFormulario();

    if (tituloModal) {

        tituloModal.textContent = "Nuevo Terreno";

    }

    actualizarWizard();

    modal.classList.add("activo");

}

window.abrirModalEditar = function () {

    pasoActual = 0;

    if (tituloModal) {

        tituloModal.textContent = "Editar Terreno";

    }

    actualizarWizard();

    modal.classList.add("activo");

};

window.cargarTerrenoEnFormulario = function(terreno){

    document.getElementById("nombreTerreno").value =
        terreno.nombre ?? "";

    document.getElementById("municipio").value =
        terreno.municipio ?? "";

    document.getElementById("tipo").value =
        terreno.tipo ?? "";

    document.getElementById("precio").value =
        terreno.precio ?? "";

    document.getElementById("metros").value =
        terreno.metros ?? "";

    document.getElementById("descripcion").value =
        terreno.descripcion ?? "";

    document.getElementById("visible").checked =
        terreno.visible ?? true;

    document.getElementById("destacado").checked =
        terreno.destacado ?? false;

    document.getElementById("latitud").value =
        terreno.latitud ?? "";

document.getElementById("longitud").value =
    terreno.longitud ?? "";

if(terreno.multimedia){

    window.cargarMultimedia(terreno.multimedia);

}

window.cargarUbicacion(

    Number(terreno.latitud),

    Number(terreno.longitud)

);

};

btnNuevo.addEventListener("click", abrirModalCrear);

cerrar.addEventListener("click", () => {

    modal.classList.remove("activo");

});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {

        modal.classList.remove("activo");

    }

});

btnAnterior.addEventListener("click", () => {

    if (pasoActual > 0) {

        pasoActual--;

        actualizarWizard();

    }

});

btnSiguiente.addEventListener("click", () => {

    if (pasoActual < 2) {

        pasoActual++;

        actualizarWizard();

        if (pasoActual === 2) {

            setTimeout(() => {

                window.iniciarMapa();

            }, 100);

        }

        return;

    }

    const datos = {

        nombre: document.getElementById("nombreTerreno").value.trim(),

        municipio: document.getElementById("municipio").value.trim(),

        tipo: document.getElementById("tipo").value,

        precio: Number(document.getElementById("precio").value),

        metros: Number(document.getElementById("metros").value),

        descripcion: document.getElementById("descripcion").value.trim(),

        visible: document.getElementById("visible").checked,

        destacado: document.getElementById("destacado").checked,

        latitud: Number(document.getElementById("latitud").value),

        longitud: Number(document.getElementById("longitud").value),

        multimedia: structuredClone(window.multimedia)

    };

    window.guardarTerreno(datos);

});

actualizarWizard();