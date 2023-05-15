const boton1=document.getElementById("boton1");
const boton2=document.getElementById("boton2");
const boton3=document.getElementById("boton3");
const Fondo=document.querySelector("body");

boton1.addEventListener("click", function(){
    Fondo.style.backgroundColor="red";
});
boton2.addEventListener("click",function(){
    Fondo.style.backgroundColor="green";
});
boton3.addEventListener("click", function(){
    Fondo.style.backgroundColor="blue";
});


function contadorcaracteres(){
    const mensaje=document.getElementById("mensaje");
    const contador=document.getElementById("constador");
    const caracter=mensaje.value.length;
    contador.textContent=caracter + "caracteres";
    
}

const mensaje=document.getElementById("mensaje");
mensaje.addEventListener("input",contadorcaracteres);

