const express = require('express');

const app = express();

require('dotenv').config()
console.log(process.env)
const port = process.env.PORT


//midlewire
app.use(express.json())

var coleccion = [
                { 
                    nombre : "Lan",
                    numero: 30,
                    descripcion: "sadcorever",
                    song: [
                        {
                            titulo : "Guerra",
                            artista: "Porta",
                            nomAlbum: "Lan",
                            añoEdicion: 2003
                        },
                        {
                            titulo : "Post Malone",
                            artista: "Sunflower",
                            nomAlbum: "Lan",
                            añoEdicion: 2005
                        }
                    ]
                }
            ]


app.get('/lista', (pedido,respuesta) => {
    respuesta.send(coleccion)
})



app.post('/lista', (pedido,respuesta) => {
    let canciones = pedido.body;
    let cancion = canciones.filter(x => x.nombre)
    if ( cancion == "" ) {
        respuesta.status(400).send("Bad Request")
    }
    else
    {
        coleccion = coleccion.concat(pedido.body)
        respuesta.status(201, "created")
        respuesta.send(pedido.body)
    }
})

app.get('/lista/:name', (pedido,respuesta) => 
{
    let name = pedido.params.name
    let ver = coleccion.some(x => x.nombre == name)
    if (ver == false) {
        respuesta.status(404,"No Found").send()    
    }
    else
    {
        let cancion = coleccion.find(x => x.nombre == name)
        respuesta.send(cancion.descripcion)
    }
})


app.put('/lista/:name', (pedido,respuesta) => {
    let name = pedido.params.name
    let ifExist = coleccion.some(x => x.nombre == name)
    if (ifExist == false) {
        respuesta.status(404, "No Found").send()
    }
    else
    {
        var cancion = coleccion.find(x => x.nombre == name)
        var remplazo = pedido.body[0]
        if (remplazo.nombre != cancion.nombre) {
            respuesta.status(409, "Conflict").send();
        }
        else{
            var pocision = 0;
            coleccion.forEach((item, index) => {
                if (item.nombre == remplazo.nombre) {
                    pocision = index;
                }
            });
            cancion = remplazo;
            coleccion[pocision] = cancion;
            respuesta.status(204, "No Content").send()  
        }
    }
})

app.delete('/lista/:name', (pedido, respuesta) => {

    if ( (coleccion.some(x => x.nombre == pedido.params.name)) == true) {
        coleccion = coleccion.filter(x => x.nombre != pedido.params.name)
        respuesta.status(204, "No content").send();
    }
    else respuesta.status(404, "No found").send()
})





//Parte 2
app.get('/lista/:name/song', (pedido,respuesta) => {
    let name = pedido.params.name
    if ((coleccion.some(x => x.nombre == name))== true) {
        let cancion = coleccion.filter(x => x.nombre == name).at(0)
        respuesta.send(cancion.song)
        console.log(cancion.song)
    }
    else {
        respuesta.status(404).send("No se encuentra la lista")
    }
})

app.get('/lista/:name/song/:titulo', (pedido, respuesta) => {
    let name = pedido.params.name
    let title = pedido.params.titulo
    if ((coleccion.some(x => x.nombre == name))== true) {
        let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)
        if ((nomAlbum.song.some(x => x.titulo == title)) == true) {
            let cancion = nomAlbum.song.filter(x => x.titulo == title).at(0)
            respuesta.send(cancion)
        }
        else respuesta.send(404, "No Found")
    }
    else {
        respuesta.status(404, "No Found").send("No se encuentra la lista")
    }
})


app.post('/lista/:name/song', (pedido, respuesta) => {
    let name = pedido.params.name
    if ((coleccion.some(x => x.nombre == name))== true) {
        let cancion = coleccion.filter(x => x.nombre == name).at(0)
        if (pedido.body.titulo != null) {
            coleccion = coleccion.filter(x => x.nombre != name)
            cancion.song.push(pedido.body)
            coleccion.push(cancion)
            respuesta.send(cancion)
        }
        else respuesta.status(404).send("Bad request")
    }
    else {
        respuesta.status(404).send("No se encuentra la lista")
    }
})

app.put('/lista/:name/song/:titulo', (pedido, respuesta) => {
    let name = pedido.params.name;
    let title = pedido.params.titulo;
    if ((coleccion.some(x => x.nombre == name)) == true) {

        let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)

        if ((nomAlbum.song.some(x => x.titulo == title)) == true) {

            if (pedido.body.titulo == title) {

                let iColeccion = coleccion.indexOf(nomAlbum)
                var iCancion = 0;
                coleccion[iColeccion].song.forEach((element, i) => {
                if (element.titulo == title) {
                    iCancion = i;
                }
                })
                coleccion[iColeccion].song[iCancion].artista = pedido.body.artista;
                coleccion[iColeccion].song[iCancion].añoEdicion = pedido.body.añoEdicion;
                coleccion[iColeccion].song[iCancion].nomAlbum = pedido.body.nomAlbum;
            }
            else respuesta.status(404, "No Found").send()
        }
        else respuesta.status(404, "No Found").send()
    }
    else respuesta.status(404, "No Found").send()
    respuesta.send()
})

app.delete('/lista/:name/song/:titulo', (pedido, respuesta) => {
    let name = pedido.params.name
    let title = pedido.params.titulo
    if ((coleccion.some(x => x.nombre == name)) == true) {
        let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)

        if ((nomAlbum.song.some(x => x.titulo == title)) == true) {

            let iColeccion = coleccion.indexOf(nomAlbum)
            var iCancion = 0;

            coleccion[iColeccion].song.forEach((element, i) => {
            if (element.titulo == title) {
                iCancion = i;
            }
            })

            coleccion[iColeccion].song.splice(iCancion,1)
            respuesta.send()
        }
        else respuesta.status(404, "No Found").send()
    }
    else respuesta.status(404, "No Found").send()
    respuesta.send()
})

app.listen(port)





// {
//     "titulo": "Skill",
//     "artista": "Hero",
//     "nomAlbum": "Lan",
//     "añoEdicion": 2003
// }



// [
//     {"nombre": "Moderna",
//             "descripcion": "sadcoreverfannnn",
//             "song":[
//               {
//                 "titulo": "",
//                 "descripcion": "Musica creada cerca de los 90",
//                 "duracion": 3500
//               },
//               {
//                 "titulo": "Linkin Park",
//                 "descripcion": "Musica creada cerca de los 2000",
//                 "duracion": 4000
//               },
//               {
//                 "titulo": "Porta",
//                 "descripcion": "Musica creada cerca de los 2005",
//                 "duracion": 7000
//               }
//             ]   
//     }
// ]