//código JS
const game = document.querySelector("#game")
const year = document.querySelector("#year")
const platform = document.querySelector("#platform")
const sendBtn = document.querySelector("#sendBtn")
const videogamesList = document.querySelector("#videogamesList")

//let db = JSON.parse( localStorage.getItem("db") || "[]" )

const db = [
    {title: "hola", year: "1970", platform: "dos" },
    {title: "adios", year: "1975", platform: "win" },
    {title: "que tal", year: "1965", platform: "atari" }
]
arrayToTable(db,videogamesList)

//encabezado TITULO del juego, clicable para ordenar
const titleHead = document.querySelector("#videogamesList th")
//const yearHead = document.querySelector("#videogamesList th:nth-child(2)")
const yearHead = document.querySelectorAll("#videogamesList th")[1]
//const platformHead = document.querySelector("#videogamesList th:nth-child(3)")
const platformHead = document.querySelectorAll("#videogamesList th")[2]

titleHead.addEventListener("click",function(){
    //ordenar alfabéticamente por nombre
    db.sort( (game1,game2) => {
        if (game1.title.toLowerCase() < game2.title.toLowerCase()) return -1
        else return 1
    } )
    //renderizar de nuevo el array ya ordenado
    arrayToTable(db,videogamesList)
})

//db_filtered = db.filter( game => game.title.toLowerCase().includes("w") )



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
    } )
}
