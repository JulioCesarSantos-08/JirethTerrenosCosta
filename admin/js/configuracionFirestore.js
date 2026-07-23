import { db } from "../../firebase.js";

import {

    doc,

    onSnapshot,

    setDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const referencia = doc(
    db,
    "configuracion",
    "general"
);

onSnapshot(

    referencia,

    documento=>{

        if(
            documento.exists()
            &&
            window.cargarConfiguracion
        ){

            window.cargarConfiguracion(
                documento.data()
            );

        }

    }

);

window.guardarConfiguracion = async function(){

    const datos={

        nombreEmpresa:
        document.getElementById("nombreEmpresa").value,

        eslogan:
        document.getElementById("eslogan").value,

        whatsapp:
        document.getElementById("whatsapp").value,

        correo:
        document.getElementById("correo").value,

        direccion:
        document.getElementById("direccion").value,

        facebook:
        document.getElementById("facebook").value,

        instagram:
        document.getElementById("instagram").value,

        tiktok:
        document.getElementById("tiktok").value,

        youtube:
        document.getElementById("youtube").value,

        latitud:
        Number(document.getElementById("latitud").value),

        longitud:
        Number(document.getElementById("longitud").value),

        zoom:
        Number(document.getElementById("zoom").value),

        textoWhatsapp:
        document.getElementById("textoWhatsapp").value

    };

    await setDoc(

        referencia,

        datos

    );

    alert("Configuración guardada correctamente.");

}