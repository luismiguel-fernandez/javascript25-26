/*******************************/
/* recuperar elementos del DOM */
/*******************************/
const tablero = document.querySelector("#tablero")
const ANCHURA_TABLERO = 900
const ALTURA_TABLERO = 450
const DIAMETRO_BOLA = 30

/*********************/
/* código automático */
/*********************/

//0. Trasladar las dimensiones del tablero al DIV del tablero
tablero.style.width = ANCHURA_TABLERO + "px"
tablero.style.height = ALTURA_TABLERO + "px"

//1. crear una bola dentro del tablero
let bola = document.createElement("DIV")
bola.classList.add("bola")
tablero.append(bola)

//2. interval para que la bola se mueva un poco cada 50 ms
let intervalo = setInterval( moverBola, 50 )

/************************/
/* funciones auxiliares */
/************************/
function moverBola() {
    //cambiar top y left del DIV de la bola
}