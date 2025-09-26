//código JS
let txtAdd = document.querySelector("#txtAdd")
let mylist = document.querySelector("#mylist")
let mycart = document.querySelector("#mycart")

let btnSelAll = document.querySelector("#btnSelAll")
let btnSelNot = document.querySelector("#btnSelNot")
let btnInvSel = document.querySelector("#btnInvSel")
let btnMovSel = document.querySelector("#btnMovSel")
let btnDelSel = document.querySelector("#btnDelSel")

let btnEmpCar = document.querySelector("#btnEmpCar")

//Implementación de la funcionalidad
txtAdd.focus()
txtAdd.value = ""

txtAdd.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        //recuperar el producto que ha escrito el usuario en la caja
        let producto = txtAdd.value.trim()
        if (producto !== "") {
            //crear un ITEM de LISTA
            let nuevoLI = document.createElement("LI")
            //darle contenido a ese ITEM de LISTA para que se muestre el producto
            nuevoLI.textContent = producto
            //conectar ese nuevo elemento LI al árbol DOM existente
            mylist.append(nuevoLI)
            //vaciar la caja de texto para comodidad del usuario
            txtAdd.value = ""
            //el nuevo LI sea clicable para que el usuario lo pueda seleccionar
            nuevoLI.addEventListener("click",function(){
                // if (nuevoLI.classList.contains("seleccionado"))
                //     nuevoLI.classList.remove("seleccionado")
                // else
                //     nuevoLI.classList.add("seleccionado")
                nuevoLI.classList.toggle("seleccionado")
            })
        } else {
            txtAdd.placeholder = "No puedes insertar en blanco"
        }
    }

})

btnSelAll.addEventListener("click",function(){
    //let productos = document.querySelectorAll("#mylist li") //todos los descend LI del elemento #mylist
    let productos = document.querySelectorAll("#mylist>li") //todos los hijos directos LI del elemento #mylist
    for (let i=0; i<productos.length; i++) {
        productos[i].classList.add("seleccionado")
    }
})

btnSelNot.addEventListener("click",function(){
    //let productos = document.querySelectorAll("#mylist li") //todos los descend LI del elemento #mylist
    let productos = document.querySelectorAll("#mylist>li") //todos los hijos directos LI del elemento #mylist
    productos.forEach( e => {
        e.classList.remove("seleccionado")
    })
})

btnInvSel.addEventListener("click",function(){
    //let productos = document.querySelectorAll("#mylist li") //todos los descend LI del elemento #mylist
    let productos = document.querySelectorAll("#mylist>li") //todos los hijos directos LI del elemento #mylist
    productos.forEach( e => {
        e.classList.toggle("seleccionado")
    })
})

btnMovSel.addEventListener("click",function(){
    let seleccionados = document.querySelectorAll("#mylist>li.seleccionado")
    seleccionados.forEach( e => {
        //crear un nuevo LI para #mycart
        let nuevoLI = document.createElement("LI")
        //al nuevo LI le copio el texto que tiene el LI original
        nuevoLI.textContent = e.textContent
        //conectar a mycart el nuevo LI
        mycart.append(nuevoLI)
        //eliminamos el LI original, el de #mylist
        e.remove()
    })
})

btnDelSel.addEventListener("click",function(){
    let seleccionados = document.querySelectorAll("#mylist>li.seleccionado")
    seleccionados.forEach( e => e.remove() )
})

btnEmpCar.addEventListener("click",function(){
    // let productos = document.querySelectorAll("#mycart li")
    // productos.forEach( e => e.remove() )
    // ESTAS 2 LINEAS EQUIVALEN A...
    mycart.innerHTML = ""
})