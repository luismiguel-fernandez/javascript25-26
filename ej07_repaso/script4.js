/* Reto 4
  Crea un documento HTML que simule aproximadamente el juego
  de Blackjack. Primero entregará al usuario un número aleatorio
  entre 1 y 11. A continuación preguntará al usuario si quiere
  más números. Mientras el usuario conteste que sí, el programa
  generará más números aleatorios entre 1 y 11. Si el usuario
  acumula más de 21 puntos directamente ha perdido.
  Si el jugador deja de pedir números antes de sobrepasar el 21,
  entonces el programa generará cartas aleatorias para el crupier
  para competir contra el jugador y decidir quién ha ganado
  la partida.
*/

let cartaBtn = document.querySelector("#cartaBtn")
let plantarseBtn = document.querySelector("#plantarseBtn")
let marcadorDiv = document.querySelector("#marcadorDiv")

let cartasJugador = []

cartaBtn.addEventListener("click",function(){
  let nuevaCarta = Math.floor(Math.random()*11) + 1 //genero carta entre 1 y 11
  cartasJugador.push(nuevaCarta)
  let totalJugador = sumArray(cartasJugador)
  marcadorDiv.textContent = cartasJugador + " = " + totalJugador
  cartaBtn.textContent = "Sacar otra carta más"
  if (totalJugador > 21) {
    //Sacar un mensaje
    marcadorDiv.innerHTML += "<br>Te has pasado de 21. Pierdes."
    //bloquear el botón de "sacar carta" o sustituir por "Empezar de nuevo"
    cartaBtn.textContent = "Empezar"
    //vaciar la mano de cartas del jugador
    cartasJugador = []
  }
})


function sumArray(arr) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}