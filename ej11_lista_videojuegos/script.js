//código JS
const game = document.querySelector("#game")
const year = document.querySelector("#year")
const platform = document.querySelector("#platform")
const sendBtn = document.querySelector("#sendBtn")
const videogamesList = document.querySelector("#videogamesList")

//let db = JSON.parse( localStorage.getItem("db") || "[]" )
let order = false //false: a-->z o 0-->9
                  //true: z-->a o 9-->0

const db = [
    {title: "hola", year: "1970", platform: "dos" },
    {title: "adios", year: "1975", platform: "win" },
    {title: "que tal", year: "1965", platform: "atari" }
]
arrayToTable(db,videogamesList)
let db_filtered = db
const favs = JSON.parse( localStorage.getItem("favs") || "[]" )

//encabezado TITULO del juego, clicable para ordenar
const titleHead = document.querySelector("#videogamesList th")
//const yearHead = document.querySelector("#videogamesList th:nth-child(2)")
const yearHead = document.querySelectorAll("#videogamesList th")[1]
//const platformHead = document.querySelector("#videogamesList th:nth-child(3)")
const platformHead = document.querySelectorAll("#videogamesList th")[2]

titleHead.addEventListener("click",function(){
    order = !order
    //ordenar alfabéticamente por nombre
    db_filtered.sort( (game1,game2) => {
        if (game1.title.toLowerCase() < game2.title.toLowerCase()) return order?-1:1
        else return order?1:-1
    } )
    //renderizar de nuevo el array ya ordenado
    arrayToTable(db_filtered,videogamesList)
})


let secondDiv = document.querySelectorAll(".container>div")[1]
let patternInput = secondDiv.querySelector("input.form-control[type='text']")

patternInput.addEventListener("keyup",function(){
    //filtrar por lo que el usuario haya escrito en esta caja
    db_filtered = db.filter( game => game.title.toLowerCase().includes(patternInput.value.trim().toLowerCase())
                                    || game.year.includes(patternInput.value.trim() ))
    arrayToTable(db_filtered,videogamesList)
})

//ordenar numéricamente por año
db.sort( (game1,game2) => {
    /*if (game1.year < game2.year) return -1
    else return 1*/
    //alternativa más compacta: restar equivale al if..else anterior (devuelve neg o pos)
    return game1.year - game2.year
} )

function arrayToTable(array,table) {
    //mostrar el array indicado en la estructura table proporcionada
    const body = table.querySelector("tbody")
    body.innerHTML = ""
    array.forEach( game => {
        let newTR = body.insertRow()
        let newTD1 = newTR.insertCell()
        let newTD2 = newTR.insertCell()
        let newTD3 = newTR.insertCell()
        let newTD4 = newTR.insertCell()
        newTD1.textContent = game.title
        newTD2.textContent = game.year
        newTD3.textContent = game.platform
        let favButton = document.createElement("button")
        favButton.classList.add("btn","btn-outline-secondary")
        const heart = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                        </svg>`
        const heartFilled = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                            </svg>`
        if ()

        favButton.innerHTML = 
        newTD4.append(favButton)
        favButton.addEventListener("click",function(){
            //alternar la pertenencia a "favoritos"
            //averiguar si está ya en favoritos o no
            let i = favs.findIndex( g => g.title == game.title && g.year == game.year && g.platform == game.platform )
            if ( i >= 0) {
                //el juego está en favs --> quitarlo
                favs.splice(i,1)
                localStorage.setItem("favs",JSON.stringify(favs))
                //apagar su corazón

            } else {
                //el juego NO está en favs
                favs.push(game)
                localStorage.setItem("favs",JSON.stringify(favs))
                //encender el corazon

            }
        })
    } ) //end of forEach
}
