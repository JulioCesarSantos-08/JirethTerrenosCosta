window.cargarConfiguracion=function(datos){

    document.getElementById("nombreEmpresa").value=

        datos.nombreEmpresa||"";

    document.getElementById("eslogan").value=

        datos.eslogan||"";

    document.getElementById("whatsapp").value=

        datos.whatsapp||"";

    document.getElementById("correo").value=

        datos.correo||"";

    document.getElementById("direccion").value=

        datos.direccion||"";

    document.getElementById("facebook").value=

        datos.facebook||"";

    document.getElementById("instagram").value=

        datos.instagram||"";

    document.getElementById("tiktok").value=

        datos.tiktok||"";

    document.getElementById("youtube").value=

        datos.youtube||"";

    document.getElementById("latitud").value=

        datos.latitud??"";

    document.getElementById("longitud").value=

        datos.longitud??"";

    document.getElementById("zoom").value=

        datos.zoom??"";

    document.getElementById("textoWhatsapp").value=

        datos.textoWhatsapp||"";

}

document
.getElementById("btnGuardarConfiguracion")
.onclick=()=>{

    guardarConfiguracion();

};