/*******************************/
/* recuperar elementos del DOM */
/*******************************/
const tablero = document.querySelector("#tablero")
const ANCHURA_TABLERO = 900
const ALTURA_TABLERO = 450
const DIAMETRO_BOLA = 30

const addBallBtn = document.querySelector("#addBallBtn")

/*********************/
/* código automático */
/*********************/

//0. Trasladar las dimensiones del tablero al DIV del tablero
tablero.style.width = ANCHURA_TABLERO + "px"
tablero.style.height = ALTURA_TABLERO + "px"

let bolas = []

//1. Los botones escuchen clics
addBallBtn.addEventListener("click", function() {
    crear_bola()
})

//2. interval para que la bola se mueva un poco cada 50 ms
let intervalo = setInterval( moverBolas, 20 )

/************************/
/* funciones auxiliares */
/************************/
//1. crear una bola dentro del tablero
function crear_bola() {
    let bola = document.createElement("DIV")
    bola.classList.add("bola")
    tablero.append(bola)

    let instanciaBola = new Bola(
        bola,
        Math.floor(Math.random()*(ALTURA_TABLERO-DIAMETRO_BOLA)),
        Math.floor(Math.random()*(ANCHURA_TABLERO-DIAMETRO_BOLA)),
        Math.random()*4 - 2,
        Math.random()*4 - 2,
        `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
    )
    instanciaBola.punteroDiv.style.backgroundColor = instanciaBola.color
    bolas.push(instanciaBola)
}
function moverBolas() {
    bolas.forEach( b => {
        b.left += b.velx
        if (b.left < 0 || b.left >= ANCHURA_TABLERO - DIAMETRO_BOLA) b.velx *= -1
        b.top += b.vely
        if (b.top < 0 || b.top >= ALTURA_TABLERO - DIAMETRO_BOLA) b.vely *= -1
        b.punteroDiv.style.left = b.left + "px"
        b.punteroDiv.style.top = b.top + "px"
    })

    // Código para cuando sólo hay una bola global sin arrays ni clases

    // //cambiar top y left del DIV de la bola
    // bola_x += vel_x
    // //si me salgo por la derecha o izq cambio el signo de la velocidad horiz
    // if (bola_x >= ANCHURA_TABLERO - DIAMETRO_BOLA) vel_x *= -1
    // if (bola_x < 0) vel_x *= -1
    
    // bola_y += vel_y
    // //si me salgo por abajo o arriba cambio el signo de la velocidad vertical
    // if (bola_y >= ALTURA_TABLERO - DIAMETRO_BOLA) vel_y *= -1
    // if (bola_y < 0) vel_y *= -1
    // bola.style.left = bola_x + "px"
    // bola.style.top = bola_y + "px"
}