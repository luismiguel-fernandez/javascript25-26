//código JS
const searchInput = document.getElementById("searchInput")
const resultsList = document.getElementById("resultsList")

searchInput.addEventListener("keyup",function(ev){
    //vaciar lista de resultados
    resultsList.innerHTML = ""
    //lanzar una nueva búsqueda con lo escrito por el usuario
    fetch("https://www.omdbapi.com/?apikey=1171f65e&s=" + searchInput.value.trim() )
    //listar los nuevos resultados
    .then( resp => resp.json() )
    .then( results => {
        //comprobar si Response es true o false
        if (results.Response == "True") {
            results.Search.forEach( r => {
                //crear un LI
                let nuevoLI = document.createElement("LI")
                //darle contenido y aspecto
                nuevoLI.classList.add("list-group-item")
                
                nuevoLI.innerHTML = `<button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        ${r.Title} (${r.Year})
                                    </button>`
                // nuevoLI.textContent = r.Title + " (" + r.Year + ")"
                
                
                //clicables
                nuevoLI.addEventListener("click",function(){
                    //cerrar resultados
                    resultsList.innerHTML = ""
                    //abrir ficha detallada de ese resultado
                    fetch("https://www.omdbapi.com/?apikey=1171f65e&i=" + r.imdbID)
                    .then( resp => resp.json() )
                    .then( details => {
                        console.log(details)
                    } )
                })
                //agregarlo al UL
                resultsList.append(nuevoLI)
            })
        }
    } )
})