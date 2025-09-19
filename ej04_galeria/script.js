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
    if (foto_actual > 0)
        foto_actual--

    img.src = "img/" + fotos[foto_actual]
})
botones[1].addEventListener("click", function(){
    if (foto_actual < fotos.length-1)
        foto_actual++
    
    img.src = "img/" + fotos[foto_actual]
})