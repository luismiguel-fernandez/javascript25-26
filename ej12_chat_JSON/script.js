const chat = document.querySelector("#chat")
const nick = document.querySelector("#nick")
const teclado = document.querySelector("#teclado")

teclado.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        //recuperamos el nick y el mensaje
        let nickValue = nick.value.trim()
        let mensajeValue = teclado.value.replace("<","")
        if (nickValue && mensajeValue) {
            //llamar al PHP de insercion de mensajes
            let options = {
                method: "POST",
                body: new URLSearchParams("nick="+nickValue+"&mensaje="+mensajeValue)
            }
            fetch("server/chat_insert_post.php",options)
            teclado.value = ""
        }
    }
})

let consultador = setInterval(consultarMensajes, 2000)
let ultimoId = 0

function consultarMensajes() {
    fetch("server/chat_select_get_json.php?ultimo="+ultimoId)
        //procesar datos JSON y mostrar en el div CHAT todos los mensajes llegados en el JSON
        //1.parsear la respuesta JSON que hemos recibido
    .then( data => data.json() )
    .then( arrayMensajes => {
        //2. mostrar en pantalla el array resultante del parseado del JSON
        console.log(arrayMensajes)
        arrayMensajes.forEach( m => {
            //imprimir el mensaje "m"
            //un mensaje "m" tiene este aspecto:
            //{"id":1,"nick":"luismi","texto":"hola","fecha":"2025-01-30 18:39:40"}
            let nuevoDiv = document.createElement("DIV")
            nuevoDiv.innerHTML = `
                <h5>${m.nick}</h5>
                <span>${m.texto}</span>
            `
            chat.append(nuevoDiv)
            nuevoDiv.classList.add("mensaje")
            ultimoId = m.id
            chat.scrollTop = chat.scrollHeight
        })
    })
}
