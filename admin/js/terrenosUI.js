const carpeta=document.getElementById("carpeta");

const galeria=document.getElementById("galeriaPreview");

carpeta.addEventListener("input",actualizarPreview);

function actualizarPreview(){

const nombre=carpeta.value.trim();

galeria.innerHTML="";

if(nombre===""){

galeria.innerHTML=`
<div class="previewVacio">

Todavía no hay imágenes.

</div>
`;

return;

}

for(let i=1;i<=6;i++){

const ruta=`../../terrenos/${nombre}/img${i}.png`;

const div=document.createElement("div");

div.className="previewImagen";

const img=document.createElement("img");

img.src=ruta;

img.onerror=()=>{

div.remove();

if(galeria.children.length===0){

galeria.innerHTML=`
<div class="previewVacio">

No se encontraron imágenes.

</div>
`;

}

};

div.appendChild(img);

galeria.appendChild(div);

}

}