let mapa;
let marcador;

const inputLatitud = document.getElementById("latitud");
const inputLongitud = document.getElementById("longitud");
const btnMiUbicacion = document.getElementById("btnMiUbicacion");

function iniciarMapa() {

    if (mapa) return;

    mapa = L.map("mapaTerreno").setView([16.8609, -96.7842], 13);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            maxZoom: 20,
            attribution: "&copy; OpenStreetMap"
        }
    ).addTo(mapa);

    marcador = L.marker(
        [16.8609, -96.7842],
        {
            draggable: true
        }
    ).addTo(mapa);

    actualizarInputs(
        16.8609,
        -96.7842
    );

    marcador.on("dragend", () => {

        const posicion = marcador.getLatLng();

        actualizarInputs(
            posicion.lat,
            posicion.lng
        );

    });

    mapa.on("click", e => {

        marcador.setLatLng(e.latlng);

        actualizarInputs(
            e.latlng.lat,
            e.latlng.lng
        );

    });

    setTimeout(() => {

        mapa.invalidateSize();

    },300);

}

function actualizarInputs(lat,lng){

    inputLatitud.value = lat.toFixed(6);

    inputLongitud.value = lng.toFixed(6);

}

btnMiUbicacion.addEventListener("click",()=>{

    if(!navigator.geolocation){

        return;

    }

    navigator.geolocation.getCurrentPosition(pos=>{

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        mapa.setView([lat,lng],17);

        marcador.setLatLng([lat,lng]);

        actualizarInputs(lat,lng);

    });

});

window.iniciarMapa = iniciarMapa;

window.cargarUbicacion=function(lat,lng){

    iniciarMapa();

    if(!mapa || !marcador)return;

    mapa.setView([lat,lng],17);

    marcador.setLatLng([lat,lng]);

    actualizarInputs(lat,lng);

}