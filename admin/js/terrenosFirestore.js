import { db } from "../../firebase.js";

import {

    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    onSnapshot,
    query

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.modoTerreno = "crear";

window.idTerrenoEditando = null;

async function guardarTerreno(datos){

    try{

        if(window.modoTerreno==="crear"){

            await addDoc(

                collection(db,"terrenos"),

                {

                    ...datos,

                    fechaCreacion:serverTimestamp()

                }

            );

            alert("Terreno guardado correctamente.");

        }else{

            await updateDoc(

                doc(db,"terrenos",window.idTerrenoEditando),

                datos

            );

            alert("Terreno actualizado correctamente.");

        }

        document.getElementById("modalTerreno").classList.remove("activo");

        window.modoTerreno="crear";

        window.idTerrenoEditando=null;

    }

    catch(error){

        console.error(error);

        alert("Ocurrió un error al guardar.");

    }

}

async function editarTerreno(id){

    try{

        const referencia=doc(db,"terrenos",id);

        const documento=await getDoc(referencia);

        if(!documento.exists()){

            alert("El terreno ya no existe.");

            return;

        }

        const terreno=documento.data();

        window.modoTerreno="editar";

        window.idTerrenoEditando=id;

        window.cargarTerrenoEnFormulario(terreno);

        window.abrirModalEditar();

    }

    catch(error){

        console.error(error);

        alert("No fue posible abrir el terreno.");

    }

}

async function eliminarTerreno(id){

    const confirmar = confirm(
        "¿Estás seguro de eliminar este terreno?\n\nEsta acción no se puede deshacer."
    );

    if(!confirmar){
        return;
    }

    try{

        await deleteDoc(
            doc(db,"terrenos",id)
        );

        alert("Terreno eliminado correctamente.");

    }catch(error){

        console.error(error);

        alert("Ocurrió un error al eliminar el terreno.");

    }

}

function listarTerrenos(){

    const tbody=document.getElementById("listaTerrenos");

    const consulta=query(collection(db,"terrenos"));

    onSnapshot(consulta,(snapshot)=>{

        tbody.innerHTML="";

        if(snapshot.empty){

            tbody.innerHTML=`

                <tr>

                    <td colspan="6" class="sinDatos">

                        Todavía no hay terrenos registrados.

                    </td>

                </tr>

            `;

            return;

        }

        snapshot.forEach(documento=>{

            const terreno=documento.data();

            const portada=

                terreno.multimedia?.carpeta &&
                terreno.multimedia?.portada

                ? `../../terrenos/${terreno.multimedia.carpeta}/${terreno.multimedia.portada}`

                : "../../imagenes/logo1.png";

            const estado=

                terreno.visible

                ? "🟢 Visible"

                : "🔴 Oculto";

            const precio=new Intl.NumberFormat(

                "es-MX",

                {

                    style:"currency",

                    currency:"MXN"

                }

            ).format(terreno.precio);

            const tr=document.createElement("tr");

            tr.innerHTML=`

                <td>

                    <img

                        src="${portada}"

                        onerror="this.src='../../imagenes/logo1.png'"

                        style="

                            width:80px;

                            height:60px;

                            object-fit:cover;

                            border-radius:8px;

                        ">

                </td>

                <td>${terreno.nombre}</td>

                <td>${terreno.municipio}</td>

                <td>${precio}</td>

                <td>${estado}</td>

<td>

    <div class="accionesTerreno">

        <button
            class="btnEditar"
            data-id="${documento.id}">

            <i class="fa-solid fa-pen"></i>

            Editar

        </button>

        <button
            class="btnEliminar"
            data-id="${documento.id}">

            <i class="fa-solid fa-trash"></i>

            Eliminar

        </button>

    </div>

</td>

            `;

            tbody.appendChild(tr);

        });

        tbody.querySelectorAll(".btnEditar").forEach(btn=>{

            btn.addEventListener("click",()=>{

                editarTerreno(btn.dataset.id);

            });

        });

        tbody.querySelectorAll(".btnEliminar").forEach(btn=>{

            btn.addEventListener("click",()=>{

                eliminarTerreno(btn.dataset.id);

            });

        });

    });

}

window.guardarTerreno=guardarTerreno;

listarTerrenos();