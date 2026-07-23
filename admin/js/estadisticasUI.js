const formatoDinero = new Intl.NumberFormat(
    "es-MX",
    {
        style: "currency",
        currency: "MXN"
    }
);

window.actualizarEstadisticas = function (terrenos) {

    document.getElementById("totalTerrenos").textContent =
        terrenos.length;

    document.getElementById("totalPublicados").textContent =
        terrenos.filter(t => t.visible).length;

    document.getElementById("totalOcultos").textContent =
        terrenos.filter(t => !t.visible).length;

    document.getElementById("totalDestacados").textContent =
        terrenos.filter(t => t.destacado).length;

    const municipiosUnicos = [
        ...new Set(
            terrenos.map(t => t.municipio)
        )
    ];

    document.getElementById("totalMunicipios").textContent =
        municipiosUnicos.length;

    const precios = terrenos.map(t => Number(t.precio) || 0);

    const total = precios.reduce(
        (a, b) => a + b,
        0
    );

    document.getElementById("valorTotal").textContent =
        formatoDinero.format(total);

    document.getElementById("precioPromedio").textContent =
        terrenos.length
            ? formatoDinero.format(total / terrenos.length)
            : formatoDinero.format(0);

    document.getElementById("precioMayor").textContent =
        formatoDinero.format(
            precios.length ? Math.max(...precios) : 0
        );

    document.getElementById("precioMenor").textContent =
        formatoDinero.format(
            precios.length ? Math.min(...precios) : 0
        );

    const municipiosGrafica = {};

    terrenos.forEach(t => {

        municipiosGrafica[t.municipio] =
            (municipiosGrafica[t.municipio] || 0) + 1;

    });

    crearGrafica(
        "graficaMunicipios",
        municipiosGrafica
    );

    const tiposGrafica = {};

    terrenos.forEach(t => {

        tiposGrafica[t.tipo] =
            (tiposGrafica[t.tipo] || 0) + 1;

    });

    crearGrafica(
        "graficaTipos",
        tiposGrafica
    );

    cargarUltimosTerrenos(terrenos);

};

function cargarUltimosTerrenos(terrenos) {

    const contenedor =
        document.getElementById("ultimosTerrenos");

    contenedor.innerHTML = "";

    terrenos
        .sort(
            (a, b) =>
                (b.fechaCreacion?.seconds || 0) -
                (a.fechaCreacion?.seconds || 0)
        )
        .slice(0, 6)
        .forEach(terreno => {

            const portada =
                terreno.multimedia?.carpeta &&
                terreno.multimedia?.portada
                    ? `../../terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`
                    : "../../imagenes/logo1.png";

            const card = document.createElement("div");

            card.className = "cardUltimo";

            card.innerHTML = `

                <img src="${portada}">

                <div class="info">

                    <h4>${terreno.nombre}</h4>

                    <p>📍 ${terreno.municipio}</p>

                    <strong>

                        ${formatoDinero.format(terreno.precio)}

                    </strong>

                </div>

            `;

            contenedor.appendChild(card);

        });

}

function crearGrafica(id, datos) {

    const contenedor =
        document.getElementById(id);

    contenedor.innerHTML = "";

    if (Object.keys(datos).length === 0) {

        contenedor.innerHTML = "Sin información";

        return;

    }

    const mayor =
        Math.max(...Object.values(datos));

    Object.entries(datos).forEach(([nombre, cantidad]) => {

        const porcentaje =
            (cantidad / mayor) * 100;

        const fila =
            document.createElement("div");

        fila.className = "barraEstadistica";

        fila.innerHTML = `

            <div class="encabezado">

                <span>${nombre}</span>

                <strong>${cantidad}</strong>

            </div>

            <div class="barra">

                <div style="width:${porcentaje}%"></div>

            </div>

        `;

        contenedor.appendChild(fila);

    });

}