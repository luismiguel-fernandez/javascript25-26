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
let totalJugador = 0

cartaBtn.addEventListener("click",function(){
  let nuevaCarta = Math.floor(Math.random()*11) + 1 //genero carta entre 1 y 11
  cartasJugador.push(nuevaCarta)
  totalJugador = sumArray(cartasJugador)
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

plantarseBtn.addEventListener("click",function(){
  //si el jugador no ha sacado ninguna carta todavía, este clic no hace nada (return)
  if (cartasJugador.length == 0) return

  //juega el crupier
  let totalCrupier = 0
  while (totalCrupier < 17 /*&& totalCrupier < totalJugador*/ ) {
    let cartaCrupier = Math.floor(Math.random()*11) + 1
    marcadorDiv.innerHTML += "<br> El crupier saca la carta " + cartaCrupier
    totalCrupier = totalCrupier + cartaCrupier
  }
  marcadorDiv.innerHTML += "<br>El crupier ha obtenido " + totalCrupier
  //Una de dos: o el crupier ha pasado o igualado 17, o ha superado al jugador
  //Comprobar primero si se ha pasado
  if (totalCrupier > 21 || totalCrupier < totalJugador) {
    //el jugador gana
    marcadorDiv.innerHTML += "<br>Ganas la partida"
  } else if (totalCrupier == totalJugador) {
    //el jugador empata con el crupier
    marcadorDiv.innerHTML += "<br>Empatas la partida"
  } else {
    //el jugador pierde
    marcadorDiv.innerHTML += "<br>Pierdes la partida"
  }
  cartasJugador = []
  cartaBtn.textContent = "Empezar"
})

function sumArray(arr) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

//botonEmpezar.style.display = "none"
//botonEmpezar.disabled = true