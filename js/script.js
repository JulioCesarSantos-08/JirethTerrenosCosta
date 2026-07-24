import { db } from "../firebase.js";

import "./leerTerrenos.js";

import {

    doc,

    getDoc

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const loader=document.getElementById("loader");

const contenido=document.getElementById("contenido");

setTimeout(()=>{

    loader.style.opacity="0";

    loader.style.transition=".6s";

    setTimeout(()=>{

        loader.remove();

        contenido.classList.remove("oculto");

    },600);

},2400);

async function cargarConfiguracion(){

    const documento=await getDoc(

        doc(

            db,

            "configuracion",

            "general"

        )

    );

    if(!documento.exists()) return;

    const config=documento.data();

    if(document.getElementById("nombreLoader")){

        document.getElementById("nombreLoader").textContent=

            config.nombreEmpresa||"";

    }

    if(document.getElementById("esloganLoader")){

        document.getElementById("esloganLoader").textContent=

            config.eslogan||"";

    }

    if(document.getElementById("nombreHero")){

        document.getElementById("nombreHero").innerHTML=

            (config.nombreEmpresa||"")

            .replace(" Costa","<br>Costa");

    }

    if(document.getElementById("descripcionHero")){

        document.getElementById("descripcionHero").textContent=

            config.eslogan||

            "";

    }

    if(document.getElementById("nombreFooter")){

        document.getElementById("nombreFooter").textContent=

            config.nombreEmpresa||"";

    }

    if(document.getElementById("direccionFooter")){

        document.getElementById("direccionFooter").textContent=

            "📍 "+

            (config.direccion||"");

    }

    if(document.getElementById("telefonoFooter")){

        document.getElementById("telefonoFooter").textContent=

            "📱 +52 "+

            (config.whatsapp||"");

    }

    if(document.getElementById("correoFooter")){

        document.getElementById("correoFooter").textContent=

            "✉ "+

            (config.correo||"");

    }

    if(document.getElementById("btnWhatsappContacto")){

        document.getElementById("btnWhatsappContacto").href=

            "https://wa.me/52"+

            config.whatsapp;

    }

    if(document.getElementById("btnWhatsappFlotante")){

        document.getElementById("btnWhatsappFlotante").href=

            "https://wa.me/52"+

            config.whatsapp;

    }

    if(document.getElementById("btnFacebook")){

        document.getElementById("btnFacebook").href=

            config.facebook||

            "#";

    }

    if(document.getElementById("linkFacebook")){

    document.getElementById("linkFacebook").href=

        config.facebook||

        "#";

}

if(document.getElementById("linkInstagram")){

    document.getElementById("linkInstagram").href=

        config.instagram||

        "#";

}

if(document.getElementById("linkTikTok")){

    document.getElementById("linkTikTok").href=

        config.tiktok||

        "#";

}

if(document.getElementById("linkYouTube")){

    document.getElementById("linkYouTube").href=

        config.youtube||

        "#";

}

}

cargarConfiguracion();