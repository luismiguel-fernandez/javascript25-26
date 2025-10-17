//código JS
const EMPRESAS = [
    "Microsoft",
    "Apple",
    "Google",
    "Cisco",
    "Amazon",
    "Nvidia",
    "Intel",
    "Patatas Acho"
]

const studentName = document.querySelector("#studentName")
const choice1 = document.querySelector("#choice1")
const choice2 = document.querySelector("#choice2")
const insertButton = document.querySelector("#insertButton")
const errorMsg = document.querySelector("#errorMsg")
const cuerpoTabla = document.querySelector("#studentsChoices>tbody")


//choices se inicializa a:
//  1) los datos que tengamos guardados en LocalStorage, si los hay
//  2) array vacío si no hay nada en LocalStorage
let choices
if (localStorage.getItem("choices")) {
    choices = JSON.parse( localStorage.getItem("choices") )
    //ahora muestra en pantalla (en el TABLE de HTML) lo que acabas de recuperar de LocalStorage
    arrayToTable()
} else {
    choices = []
}
//alternativa compacta
/*
    let choices = JSON.parse( localStorage.getItem("choices") || "[]" )
    arrayToTable()
*/

//RETO #1: rellenar el primer SELECT con estas empresas
EMPRESAS.forEach( (emp,index) => {
    let nuevoOption = document.createElement("OPTION")
    nuevoOption.textContent = emp
    nuevoOption.value = index + 1
    choice1.append(nuevoOption)
})

/*for ( let i = 0 ; i < EMPRESAS.length ; i++ ) {
    let nuevoOption = document.createElement("OPTION")
    nuevoOption.textContent = emp
    nuevoOption.value = i + 1
    choice1.append(nuevoOption)
}*/


//RETO #2: que al elegir una empresa en el primer SELECT se rellene
// el segundo SELECT con el resto de empresas no elegidas
choice1.addEventListener("change",function(){
    choice2.innerHTML = '<option value="0">(choose one)</option>'
    if (choice1.value > 0) {
        //bucle para rellenar choice2
        EMPRESAS.forEach( (emp,index) => {
            if (choice1.value != index + 1) {
                let nuevoOption = document.createElement("OPTION")
                nuevoOption.textContent = emp
                choice2.append(nuevoOption)
            }
        })
    }
})

//RETO #3: si el formulario está relleno, al hacer clic en el botón
// se inserta una nueva fila en la tabla
insertButton.addEventListener("click", function(){
    if (studentName.value != 0 && choice1.value && choice2.value) {
        choices.push({
            name: studentName.value,
            choice1: choice1.selectedOptions[0].textContent,
            choice2: choice2.selectedOptions[0].textContent
        })
        addRow()
        //guardar en LocalStorage el array choices convertido a string 
        localStorage.setItem( "choices", JSON.stringify(choices) )

        errorMsg.textContent = ""
        //resetear formulario
        studentName.value = ""
        choice1.value = 0
        choice2.innerHTML = '<option value="0">(choose one)</option>'
        studentName.focus()
    } else {
        //sacar un mensaje de error en el LABEL errorMsg
        errorMsg.textContent = "El formulario no está bien rellenado"
    }
})

function addRow(){
    //añadir una fila a la tabla
    let nuevoTR = cuerpoTabla.insertRow()
    let celda1 = nuevoTR.insertCell()
    let celda2 = nuevoTR.insertCell()
    let celda3 = nuevoTR.insertCell()
    let celda4 = nuevoTR.insertCell()
    celda1.textContent = studentName.value
    celda2.textContent = choice1.selectedOptions[0].textContent
    celda3.textContent = choice2.selectedOptions[0].textContent

    let botonBorrar = document.createElement("button")
    botonBorrar.classList.add("btn","btn-danger")
    botonBorrar.textContent = "X"
    celda4.append(botonBorrar)
    botonBorrar.addEventListener("click", function(){
        //borrar TR del HTML
        nuevoTR.remove()
        //borrar también objeto del array
        let pos = choices.findIndex( a => a.name == celda1.textContent &&
                                          a.choice1 == celda2.textContent &&
                                          a.choice2 == celda3.textContent )
        if (pos != -1) {
            choices.splice(pos,1)
            localStorage.setItem( "choices", JSON.stringify(choices) )
        }
    })
}


function arrayToTable(){
    choices.forEach( c => {
        //añadir al TBODY un TR con 4 TD para mostrar el choice "c"
        let nuevoTR = cuerpoTabla.insertRow()
        let celda1 = nuevoTR.insertCell()
        let celda2 = nuevoTR.insertCell()
        let celda3 = nuevoTR.insertCell()
        let celda4 = nuevoTR.insertCell()
        celda1.textContent = c.name
        celda2.textContent = c.choice1
        celda3.textContent = c.choice2

        let botonBorrar = document.createElement("button")
        botonBorrar.classList.add("btn","btn-danger")
        botonBorrar.textContent = "X"
        celda4.append(botonBorrar)
        botonBorrar.addEventListener("click", function(){
            //borrar TR del HTML
            nuevoTR.remove()
            //borrar también objeto del array
            let pos = choices.findIndex( a => a.name == celda1.textContent &&
                                            a.choice1 == celda2.textContent &&
                                            a.choice2 == celda3.textContent )
            if (pos != -1) {
                choices.splice(pos,1)
                localStorage.setItem( "choices", JSON.stringify(choices) )
            }
        })
    } )
}