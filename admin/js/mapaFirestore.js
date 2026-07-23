import { db } from "../../firebase.js";

import {

    collection,

    query,

    onSnapshot

} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const consulta = query(

    collection(db,"terrenos")

);

onSnapshot(

    consulta,

    snapshot=>{

        const terrenos=[];

        snapshot.forEach(documento=>{

            terrenos.push({

                id:documento.id,

                ...documento.data()

            });

        });

        if(window.cargarMapa){

            window.cargarMapa(terrenos);

        }

    }

);