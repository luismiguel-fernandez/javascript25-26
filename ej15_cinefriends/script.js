//código JS
const searchInput = document.getElementById("searchInput")
const resultsList = document.getElementById("resultsList")
const favorites = JSON.parse(localStorage.getItem("favorites") || "[]")

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
                        //rellenar el modal de HTML con los detalles de la película
                        document.getElementById("exampleModalLabel").innerHTML = details.Title
                        document.querySelector("#modalBodyDetails").innerHTML = `
                            <p>Director: ${details.Director}</p>
                            <p>Actors: ${details.Actors}</p>
                            <p>Genre: ${details.Genre}</p>
                            <p>Metascore: ${details.Metascore}</p>
                            <p>imdbRating: ${details.imdbRating}</p>
                            <p><a href="https://www.imdb.com/es-es/title/${details.imdbID}/" target="_blank">Link to IMDB</a></p>
                        `
                        document.querySelector("#modalBodyPoster").innerHTML = `
                            <img src="${details.Poster}" class="img-fluid" alt="poster">
                        `
                        if (favorites.includes(details.imdbID)) {
                            document.querySelector(".modal-footer").innerHTML = `
                            <button type="button" class="btn btn-outline-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                </svg> Recommend to a friend 
                            </button>
                        `
                        document.querySelector(".modal-footer button").addEventListener("click",function(ev){
                            console.log("entro en el click de corazon relleno")
                            //borrar el ID de la película de la lista de favoritos
                            let position = favorites.indexOf(details.imdbID)
                            favorites.splice(position,1)
                            //guardar la lista de favoritos en localStorage
                            localStorage.setItem("favorites",JSON.stringify(favorites))
                            //actualizar el HTML
                            document.querySelector(".modal-footer").innerHTML = `
                            <button type="button" class="btn btn-outline-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                </svg> Recomendar a un amigo 
                            </button>
                            `
                        })
                        } else {
                            document.querySelector(".modal-footer").innerHTML = `
                            <button type="button" class="btn btn-outline-danger">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                                </svg>
                            </button>
                            <button type="button" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                    <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                </svg> Recomendar a un amigo 
                            </button>
                            `
                            document.querySelector(".modal-footer button").addEventListener("click",function(ev){
                                //agregar el ID de la película a la lista de favoritos
                                favorites.push(details.imdbID)
                                //guardar la lista de favoritos en localStorage
                                localStorage.setItem("favorites",JSON.stringify(favorites))
                                //actualizar el HTML
                                document.querySelector(".modal-footer").innerHTML = `
                                <button type="button" class="btn btn-outline-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                                    </svg>
                                </button>
                                <button type="button" class="btn btn-primary">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
                                        <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3"/>
                                    </svg> Recomendar a un amigo 
                                </button>
                                `
                            })
                        }
                    } )
                })
                //agregarlo al UL
                resultsList.append(nuevoLI)
            })
        }
    } )
})