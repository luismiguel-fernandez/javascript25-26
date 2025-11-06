//código JS
const provincias = document.querySelector("#provincias")
const municipios = document.querySelector("#municipios")

fetch("server/cargaProv.php")
.then( respHTTP => respHTTP.text() )
.then( xmlString => {
    let parser = new DOMParser()
    let xml = parser.parseFromString(xmlString,"text/xml")
    const provs = xml.querySelectorAll("provincia")
    provs.forEach( p => {
        let codigo = p.querySelector("codigo").textContent
        let nombre = p.querySelector("nombre").textContent
        //crear un OPTION por cada provincia
        let newOption = document.createElement("OPTION")
        newOption.value = codigo
        newOption.textContent = nombre
        provincias.append(newOption)
    })
})

provincias.addEventListener("change",function(){
    municipios.innerHTML = '<option value="0">(Elige municipio)</option>'
    //averiguar si el usuario ha elegido el OPTION predeterminado
    if (provincias.value == "0") return

    //el usuario ha elegido una provincia válida
    //consultar al servidor los municipios de esa provincia elegida
    fetch("server/cargaMunic.php?provincia=" + provincias.value)
    .then( respHTTP => respHTTP.text() )
    .then( xmlString => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(xmlString,"text/xml")
        let munics = xml.querySelectorAll("municipio")
        munics.forEach( m => {
            let codigo = m.querySelector("codigo").textContent
            let nombre = m.querySelector("nombre").textContent
            //crear un OPTION por cada municipio
            let newOption = document.createElement("OPTION")
            newOption.value = codigo
            newOption.textContent = nombre
            municipios.append(newOption)
        })
    } )
})