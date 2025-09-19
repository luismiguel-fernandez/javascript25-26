























let entrada_inp = document.querySelector("#entrada_inp")
let saludar_btn = document.querySelector("#saludar_btn")
let saludo_lbl = document.querySelector("#saludo_lbl")

entrada_inp.addEventListener("keyup", function(e){
    // distinguir si la tecla pulsada es un INTRO
    if (e.key == "Enter") {
        saludar()
    }
} )

saludar_btn.addEventListener("click", function(){
    saludar()
})

function saludar(){
    let nombre = entrada_inp.value
    //saludar en el LABEL
    saludo_lbl.textContent = "Hola, " + nombre
}