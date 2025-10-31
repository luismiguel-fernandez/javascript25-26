const chat = document.querySelector("#chat")
const nick = document.querySelector("#nick")
const teclado = document.querySelector("#teclado")

teclado.addEventListener("keyup",function(ev){
    if (ev.key == "Enter") {
        //recuperamos el nick y el mensaje
        let nickValue = nick.value.trim()
        let mensajeValue = teclado.value
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

let consultador = setInterval(consultarMensajes, 1000)

function consultarMensajes() {
    fetch("server/chat_select_get_json.php?ultimo=0")
    .post( data => {
        //procesar datos JSON y mostrar en el div CHAT todos los mensajes llegados en el JSON
    })
}