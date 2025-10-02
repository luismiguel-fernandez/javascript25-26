/* Reto 1
Crea un documento HTML que solicite cuántos caramelos tienes
 y entre cuántas personas quieres repartirlos.
 A continuación el programa escribirá el mensaje:
 "Si tienes __ caramelos y hay __ personas,
 tienes que repartir __ caramelos a cada uno
 y te sobran __ caramelos".
*/

//datos entrada
const numCaramelosInput = document.querySelector("#numCaramelosInput")
const numPersonasInput = document.querySelector("#numPersonasInput")
//mensaje de salida
const resultadoTA = document.querySelector("#resultadoTA")
//disparador
const boton = document.querySelector("button")

boton.addEventListener("click",function(){
    let caramelos = numCaramelosInput.value.trim()
    let personas = numPersonasInput.value.trim()

    if (Number.isInteger(parseInt(caramelos)) && caramelos > 0) {
        if (Number.isInteger(parseInt(personas)) && personas > 0) {
            //repartir caramelos
            let repartir = Math.floor(caramelos/personas)
            let sobran = caramelos % personas
            //mostrar mensaje
            //resultadoTA.value = "Repartes " + repartir + " caramelos. Sobran " + sobran + " caramelos."
            resultadoTA.value = `Repartes ${repartir} caramelos. Sobran ${sobran} caramelos.`
        } else {
            resultadoTA.value = "Has escrito un nº incorrecto de personas"
        }
    } else {
        resultadoTA.value = "Has escrito un nº incorrecto de caramelos"
    }
})











