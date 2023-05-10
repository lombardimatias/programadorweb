let distancia=prompt("introducir distancia");

if (distancia<=1000){
    document.write ("mejor a pie")
}
else if (distancia<=10000){
    document.write ("mejor en bicicleta")
}
else if (distancia<=30000){
    document.write ("mejor en colectivo")
     }

else if (distancia<=100000){
    document.write ("mejor en auto")
}
else{
    document.write ("mejor en avion")
}
