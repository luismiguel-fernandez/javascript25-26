/* Reto 2
 Crea un documento HTML que solicite
 al usuario números por separado
 y escriba en el documento cuál es
 la diferencia entre el mayor y el menor.
*/

let numeroInput = document.querySelector("#numeroInput")
let numerosTA = document.querySelector("#numerosTA")
let calcularBtn = document.querySelector("#calcularBtn")
let vaciarBtn = document.querySelector("#vaciarBtn")
let resultadoTA = document.querySelector("#resultadoTA")

let numeros = []
//let numeros = new Array() //equivalente

numeroInput.focus()

numeroInput.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        //recuperar lo que ha escrito el usuario en la caja
        let numero = parseFloat(numeroInput.value)
        //si es un nº válido, añadirlo al array
        if (!isNaN(numero)) {
            numeros.push(numero)
            numerosTA.value = numeros
        }
        //vaciar la caja de texto
        numeroInput.value = ""
    }
})

calcularBtn.addEventListener("click",function(){
})

vaciarBtn.addEventListener("click",function(){
})