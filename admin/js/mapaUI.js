let mapa;

let marcadores=[];

function iniciarMapa(){

    mapa=L.map("mapa").setView(

        [16.8609,-96.7842],

        10

    );

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:20,

            attribution:"© OpenStreetMap"

        }

    ).addTo(mapa);

}

iniciarMapa();

function limpiarMarcadores(){

    marcadores.forEach(

        marcador=>{

            mapa.removeLayer(

                marcador

            );

        }

    );

    marcadores=[];

}

window.cargarMapa = function(terrenos){

    limpiarMarcadores();

    const lista = document.getElementById("listaTerrenos");

    lista.innerHTML="";

    document.getElementById("totalTerrenos").textContent=terrenos.length;

    terrenos.forEach(terreno=>{

        if(!terreno.latitud || !terreno.longitud){

            return;

        }

        const portada =

            terreno.multimedia?.carpeta &&

            terreno.multimedia?.portada

            ?

            `../../terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`

            :

            "../../imagenes/logo1.png";

        const precio = new Intl.NumberFormat(

            "es-MX",

            {

                style:"currency",

                currency:"MXN"

            }

        ).format(terreno.precio);

        const marcador = L.marker([

            Number(terreno.latitud),

            Number(terreno.longitud)

        ]).addTo(mapa);

        marcador.bindPopup(`

            <div class="popupMapa">

                <img
                    src="${portada}"
                    style="
                        width:100%;
                        height:140px;
                        object-fit:cover;
                        border-radius:12px;
                        margin-bottom:12px;
                    "
                >

                <h3>${terreno.nombre}</h3>

                <p>

                    📍 ${terreno.municipio}

                </p>

                <p>

                    📐 ${terreno.metros} m²

                </p>

                <strong>

                    ${precio}

                </strong>

            </div>

        `);

        marcadores.push(marcador);

        const card=document.createElement("div");

        card.className="itemTerreno";

        card.innerHTML=`

            <h4>

                ${terreno.nombre}

            </h4>

            <p>

                📍 ${terreno.municipio}

            </p>

            <strong>

                ${precio}

            </strong>

            <span>

                ${terreno.tipo}

            </span>

        `;

        card.onclick=()=>{

            mapa.setView(

                [

                    Number(terreno.latitud),

                    Number(terreno.longitud)

                ],

                18

            );

            marcador.openPopup();

        };

        lista.appendChild(card);

    });

}

    if(marcadores.length){

        const grupo = L.featureGroup(marcadores);

        mapa.fitBounds(
            grupo.getBounds(),
            {
                padding:[50,50]
            }
        );

    }