const modal=document.getElementById("modalTerreno");

const btnNuevo=document.getElementById("btnNuevo");

const cerrar=document.getElementById("cerrarModal");

const pasos=document.querySelectorAll(".paso");

const tabs=document.querySelectorAll(".tab");

const btnAnterior=document.getElementById("btnAnterior");

const btnSiguiente=document.getElementById("btnSiguiente");

let pasoActual=0;

function actualizarWizard(){

pasos.forEach((paso,index)=>{

paso.classList.toggle("activo",index===pasoActual);

});

tabs.forEach((tab,index)=>{

tab.classList.toggle("activa",index===pasoActual);

});

btnAnterior.style.visibility=

pasoActual===0

?"hidden"

:"visible";

if(pasoActual===2){

btnSiguiente.textContent="Guardar Terreno";

}else{

btnSiguiente.textContent="Siguiente";

}

}

btnNuevo.addEventListener("click",()=>{

pasoActual=0;

actualizarWizard();

modal.classList.add("activo");

});

cerrar.addEventListener("click",()=>{

modal.classList.remove("activo");

});

modal.addEventListener("click",(e)=>{

if(e.target===modal){

modal.classList.remove("activo");

}

});

btnAnterior.addEventListener("click",()=>{

if(pasoActual>0){

pasoActual--;

actualizarWizard();

}

});

btnSiguiente.addEventListener("click",()=>{

if(pasoActual<2){

pasoActual++;

actualizarWizard();

if(pasoActual===2){

    setTimeout(()=>{

        window.iniciarMapa();

    },100);

}

return;

}

console.log("Guardar");

});

actualizarWizard();