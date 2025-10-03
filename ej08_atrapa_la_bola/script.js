//código JS

const ANCHURA_TABLERO = 800
const ALTURA_TABLERO = 500
const DIAMETRO_BOLA = 30

let tablero = document.querySelector("#tablero")
let bola = document.querySelector("#bola")
let btnEmpezar = document.querySelector("#btnEmpezar")
let tiempoLabel = document.querySelector("#tiempo")
let puntosLabel = document.querySelector("#puntos")
let cuerpoRecords = document.querySelector("#records tbody")

tablero.style.width = ANCHURA_TABLERO + "px"
tablero.style.height = ALTURA_TABLERO + "px"
bola.style.width = DIAMETRO_BOLA + "px"
bola.style.height = DIAMETRO_BOLA + "px"

let timer_partida
let timer_bola
let partida_en_marcha = false
let records = [
    { nombre: "Anonymous", puntos: 10 },
    { nombre: "Anonymous", puntos: 8 },
    { nombre: "Anonymous", puntos: 6 },
    { nombre: "Anonymous", puntos: 4 },
    { nombre: "Anonymous", puntos: 2 }
]
let segundero
let puntos

mostrar_records()

bola.addEventListener("click",function(){
    if (partida_en_marcha) {
        puntosLabel.textContent = ++puntos
        mover_bola_rnd()
        clearInterval(timer_bola)
        timer_bola = setInterval( mover_bola_rnd , 1000 )
    }
})
btnEmpezar.addEventListener("click",function(){
    //empezar partida
        //anular los timers (por si ya estuvieran definidos de partidas anteriores)
        acabar_partida()
        //ponerlos en marcha de nuevo
        segundero = 10
        tiempoLabel.textContent = segundero
        puntos = 0
        puntosLabel.textContent = puntos
        partida_en_marcha = true
        timer_bola = setInterval( mover_bola_rnd, 1000 )
        timer_partida = setInterval( decrementar_tiempo, 1000 )
})
function acabar_partida() {
    clearInterval(timer_bola)
    clearInterval(timer_partida)
    partida_en_marcha = false
}
function decrementar_tiempo() {
    segundero--
    tiempoLabel.textContent = segundero
    if (segundero == 0) {
        acabar_partida()
    }
}
function mostrar_records(){
    let posicion = 1
    records.forEach( r => {
        //crear una fila TR
        let nuevoTR = document.createElement("TR")
        //crear 3 celdas TD
        let nuevoTD1 = document.createElement("TD")
        let nuevoTD2 = document.createElement("TD")
        let nuevoTD3 = document.createElement("TD")
        //darle contenido a las 3 celdas
        nuevoTD1.textContent = posicion++
        nuevoTD2.textContent = r.nombre
        nuevoTD3.textContent = r.puntos
        //conectarlo todo al árbol DOM
        nuevoTR.append(nuevoTD1,nuevoTD2,nuevoTD3)
        cuerpoRecords.append(nuevoTR)
    })
}
function mover_bola_rnd() {
    let nuevo_left = Math.floor(Math.random()* (ANCHURA_TABLERO - DIAMETRO_BOLA))
    let nuevo_top = Math.floor(Math.random()* (ALTURA_TABLERO - DIAMETRO_BOLA))
    bola.style.left = nuevo_left + "px"
    bola.style.top = nuevo_top + "px"
}