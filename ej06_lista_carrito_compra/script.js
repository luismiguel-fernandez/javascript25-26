//código JS
let txtAdd = document.querySelector("#txtAdd")
let mylist = document.querySelector("#mylist")

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