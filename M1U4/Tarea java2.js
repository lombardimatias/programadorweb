let comparacion=0;

let miarreglo=[8,20,30,5000,10,15,25,300,128,43];

for(let i=0;i<miarreglo.length;i++){
    if (miarreglo[i]>comparacion){
        comparacion=miarreglo[i];
    } 
}

document.write (miarreglo);

document.write(" el numero mayor de miarreglo: " +comparacion );
