const express = require('express');

const app = express();

// require('dotenv').config()
// console.log(process.env)
const port = 3000


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

//Endpoints


//GET
app.get('/lista', (pedido,respuesta) => {
    respuesta.send(coleccion)
})

//POST
app.post('/lista', (pedido,respuesta) => {
    let canciones = pedido.body;
    let cancion = canciones.filter(x => x.nombre)
    if ( cancion == "" ) {
        respuesta.status(400).send("Bad Request")
    }
    else
    {
        coleccion = coleccion.concat(pedido.body)
        respuesta.status(201, "created").send(pedido.body)
    }
})
//GET   
app.get('/lista/:name', (pedido,respuesta) => {
    let name = pedido.params.name
    let cancion = coleccion.filter(x => x.nombre == name).at(0)
    if (cancion == null) {
        respuesta.status(404,"No Found").send()
    }
    else respuesta.send(cancion.descripcion)
})

//PUT           
app.put('/lista/:name', (pedido,respuesta) => {
    let name = pedido.params.name;
    let cancion = coleccion.filter(x => x.nombre == name).at(0);
    if (cancion != null) {
        if (pedido.body[0].nombre == name) {
            let a = coleccion.indexOf(cancion)
            coleccion[a].descripcion = pedido.body[0].descripcion
            coleccion[a].numero = pedido.body[0].numero
            respuesta.status(204, "No Content").send();
        }
        else respuesta.status(409, "Conflict").send();
    }
    else respuesta.status(404, "No Found").send();
    
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
    let cancion = coleccion.filter(x => x.nombre == name).at(0)
    if (cancion != true) {
        respuesta.send(cancion.song)
    }
    else respuesta.status(404).send("No se encuentra la lista")
})

app.get('/lista/:name/song/:titulo', (pedido, respuesta) => {
    let name = pedido.params.name
    let title = pedido.params.titulo
    let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)
    if (nomAlbum != null) {
        let cancion = nomAlbum.song.filter(x => x.titulo == title).at(0)
        if (cancion != null)
            respuesta.send(cancion)
        else respuesta.status(404,"No Found").send("No se encuentra la cancion")
    }
    else respuesta.status(404, "No Found").send("No se encuentra la lista")
})


app.post('/lista/:name/song', (pedido, respuesta) => {
    let name = pedido.params.name
    let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)
    if (nomAlbum != null) {
        if (pedido.body.titulo != null && pedido.body.titulo != "" ) {
            nomAlbum.song.push(pedido.body)
            respuesta.send(nomAlbum)
        }
        else respuesta.status(404).send("Bad request")
    }
    else respuesta.status(404).send("No se encuentra la lista")
})



app.put('/lista/:name/song/:titulo', (pedido, respuesta) => {
    let name = pedido.params.name;
    let title = pedido.params.titulo;
    let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)
    if (nomAlbum!= null) {
        let cancion = nomAlbum.song.filter(x => x.titulo == title).at(0)
        if (cancion != null) {
            if (pedido.body.titulo == title) {
                let iColeccion = coleccion.indexOf(nomAlbum)
                let iCancion = nomAlbum.song.indexOf(cancion)
                coleccion[iColeccion].song[iCancion].artista = pedido.body.artista;
                coleccion[iColeccion].song[iCancion].añoEdicion = pedido.body.añoEdicion;
                coleccion[iColeccion].song[iCancion].nomAlbum = pedido.body.nomAlbum;
                respuesta.send("Actualizado")
            }
            else respuesta.status(404, "No Found").send()
        }
        else respuesta.status(404, "No Found").send()
    }
    else respuesta.status(404, "No Found").send()
})

app.delete('/lista/:name/song/:titulo', (pedido, respuesta) => {
    let name = pedido.params.name
    let title = pedido.params.titulo
    let nomAlbum = coleccion.filter(x => x.nombre == name).at(0)
    if (nomAlbum!= null) {
        let cancion = nomAlbum.song.filter(x => x.titulo == title).at(0)
        if (cancion != null) {
            let iColeccion = coleccion.indexOf(nomAlbum)
            let iCancion = nomAlbum.song.indexOf(cancion)
            coleccion[iColeccion].song.splice(iCancion,1)
            respuesta.send("Borrado")
        }
        else respuesta.status(404, "No Found").send()
    }
    else respuesta.status(404, "No Found").send()
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