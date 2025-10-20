//código JS
const game = document.querySelector("#game")
const year = document.querySelector("#year")
const platform = document.querySelector("#platform")
const sendBtn = document.querySelector("#sendBtn")
const videogamesList = document.querySelector("#videogamesList")

//modelo = datos
//let db = JSON.parse( localStorage.getItem("db") || "[]" )

let db = [
    { title: "The Legend of Zelda: Breath of the Wild", year: 2017, platform: "Nintendo Switch" },
    { title: "God of War", year: 2018, platform: "PlayStation 4" },
    { title: "Red Dead Redemption 2", year: 2018, platform: "PlayStation 4" },
    { title: "Minecraft", year: 2011, platform: "Multiple" },
    { title: "The Witcher 3: Wild Hunt", year: 2015, platform: "Multiple" },
    { title: "Halo: Combat Evolved", year: 2001, platform: "Xbox" },
    { title: "Super Mario Odyssey", year: 2017, platform: "Nintendo Switch" },
    { title: "Cyberpunk 2077", year: 2020, platform: "Multiple" },
    { title: "Dark Souls III", year: 2016, platform: "Multiple" },
    { title: "Fortnite", year: 2017, platform: "Multiple" },
    { title: "Call of Duty: Modern Warfare", year: 2019, platform: "Multiple" },
    { title: "Overwatch", year: 2016, platform: "Multiple" },
    { title: "Animal Crossing: New Horizons", year: 2020, platform: "Nintendo Switch" },
    { title: "Sekiro: Shadows Die Twice", year: 2019, platform: "Multiple" },
    { title: "Apex Legends", year: 2019, platform: "Multiple" },
    { title: "Doom Eternal", year: 2020, platform: "Multiple" },
    { title: "Among Us", year: 2018, platform: "Multiple" },
    { title: "Final Fantasy VII Remake", year: 2020, platform: "PlayStation 4" },
    { title: "Monster Hunter: World", year: 2018, platform: "Multiple" },
    { title: "GTA V", year: 2013, platform: "Multiple" },
    { title: "Destiny 2", year: 2017, platform: "Multiple" },
    { title: "Minecraft Dungeons", year: 2020, platform: "Multiple" },
    { title: "Super Smash Bros. Ultimate", year: 2018, platform: "Nintendo Switch" },
    { title: "Metal Gear Solid V: The Phantom Pain", year: 2015, platform: "Multiple" },
    { title: "Persona 5", year: 2016, platform: "PlayStation 3/4" },
    { title: "Resident Evil 2 (Remake)", year: 2019, platform: "Multiple" },
    { title: "Halo Infinite", year: 2021, platform: "Xbox Series X|S" },
    { title: "Control", year: 2019, platform: "Multiple" },
    { title: "Bloodborne", year: 2015, platform: "PlayStation 4" },
    { title: "Hades", year: 2020, platform: "Multiple" }
  ]
  

//refrescar la vista con los datos del modelo
arrayToTable(db,videogamesList)



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