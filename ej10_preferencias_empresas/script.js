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

const choice1 = document.querySelector("#choice1")
const choice2 = document.querySelector("#choice2")

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
    if (choice1.value > 0) {
        //bucle para rellenar choice2
        choice2.innerHTML = '<option value="0">(choose one)</option>'
        EMPRESAS.forEach( (emp,index) => {

            if (choice1.value != index + 1) {
                let nuevoOption = document.createElement("OPTION")
                nuevoOption.textContent = emp
                choice2.append(nuevoOption)
            }

        })
    }
})