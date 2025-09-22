let img = document.querySelector("img")

//código JS
let fotos = [
    "foca.webp",
    "lobo.jpg",
    "oso.webp",
    "pinguino.webp"
]

let foto_actual = 1

let botones = document.querySelectorAll("button")

botones[0].addEventListener("click", function(){
    cambiarImagen("izquierda")
})

botones[1].addEventListener("click", function(){
    cambiarImagen("derecha")
})

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      cambiarImagen('izquierda');
    } else if (event.key === 'ArrowRight') {
      cambiarImagen('derecha');
    }
});

function cambiarImagen(direccion) {
    if (direccion == "izquierda") {
        foto_actual--
        if (foto_actual < 0)
            foto_actual = fotos.length-1
        img.src = "img/" + fotos[foto_actual]
    } else if (direccion == "derecha") {
        foto_actual++
        foto_actual = foto_actual % fotos.length
        img.src = "img/" + fotos[foto_actual]
    }
}