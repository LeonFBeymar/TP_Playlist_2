import express, { json } from 'express';

const app = express();
//midlewire
app.use(json())

const port = 3000

var coleccion = [
    {
        nombre: "Lan",
        numero: 30,
        descripcion: "sadcorever",
        song: [
            {
                titulo: "Guerra",
                artista: "Porta",
                nomAlbum: "Lan",
                añoEdicion: 2003
            },
            {
                titulo: "Post Malone",
                artista: "Sunflower",
                nomAlbum: "Lan",
                añoEdicion: 2005
            }
        ]
    }
]

//Endpoints

//GET
app.get('/lista', (req, res) => {
    res.send(coleccion)
})

//POST
app.post('/lista', (req, res) => {
    let canciones = req.body;
    let cancion = canciones.find(x => x.nombre)
    if (cancion == "") {
        res.status(400).send("Bad Request")
    }
    else {
        coleccion = coleccion.concat(req.body)
        res.status(201, "created").send(req.body)
    }
})
//GET   
app.get('/lista/:name', (req, res) => {
    let name = req.params.name
    let cancion = coleccion.find(x => x.nombre == name).at(0)
    if (cancion == null) {
        res.status(404, "No Found").send()
    }
    else res.send(cancion.descripcion)
})

//PUT           
app.put('/lista/:name', (req, res) => {
    let name = req.params.name;
    let cancion = coleccion.find(x => x.nombre == name).at(0);
    if (cancion != null) {
        if (req.body[0].nombre == name) {
            let a = coleccion.indexOf(cancion)
            coleccion[a].descripcion = req.body[0].descripcion
            coleccion[a].numero = req.body[0].numero
            res.status(204, "No Content").send();
        }
        else res.status(409, "Conflict").send();
    }
    else res.status(404, "No Found").send();

})




app.delete('/lista/:name', (req, res) => {
    if ((coleccion.some(x => x.nombre == req.params.name)) == true) {
        coleccion = coleccion.find(x => x.nombre != req.params.name)
        res.status(204, "No content").send();
    }
    else res.status(404, "No found").send()
})





//Parte 2
app.get('/lista/:name/song', (req, res) => {
    let name = req.params.name
    let cancion = coleccion.find(x => x.nombre == name).at(0)
    if (cancion != true) {
        res.send(cancion.song)
    }
    else res.status(404).send("No se encuentra la lista")
})

app.get('/lista/:name/song/:titulo', (req, res) => {
    let name = req.params.name
    let title = req.params.titulo
    let nomAlbum = coleccion.find(x => x.nombre == name).at(0)
    if (nomAlbum != null) {
        let cancion = nomAlbum.song.find(x => x.titulo == title).at(0)
        if (cancion != null)
            res.send(cancion)
        else res.status(404, "No Found").send("No se encuentra la cancion")
    }
    else res.status(404, "No Found").send("No se encuentra la lista")
})


app.post('/lista/:name/song', (req, res) => {
    let name = req.params.name
    let nomAlbum = coleccion.find(x => x.nombre == name).at(0)
    if (nomAlbum != null) {
        if (req.body.titulo != null && req.body.titulo != "") {
            nomAlbum.song.push(req.body)
            res.send(nomAlbum)
        }
        else res.status(404).send("Bad request")
    }
    else res.status(404).send("No se encuentra la lista")
})



app.put('/lista/:name/song/:titulo', (req, res) => {
    let name = req.params.name;
    let title = req.params.titulo;
    let nomAlbum = coleccion.find(x => x.nombre == name).at(0)
    if (nomAlbum != null) {
        let cancion = nomAlbum.song.find(x => x.titulo == title).at(0)
        if (cancion != null) {
            if (req.body.titulo == title) {
                let iColeccion = coleccion.indexOf(nomAlbum)
                let iCancion = nomAlbum.song.indexOf(cancion)
                coleccion[iColeccion].song[iCancion].artista = req.body.artista;
                coleccion[iColeccion].song[iCancion].añoEdicion = req.body.añoEdicion;
                coleccion[iColeccion].song[iCancion].nomAlbum = req.body.nomAlbum;
                res.send("Actualizado")
            }
            else res.status(404, "No Found").send()
        }
        else res.status(404, "No Found").send()
    }
    else res.status(404, "No Found").send()
})

app.delete('/lista/:name/song/:titulo', (req, res) => {
    let name = req.params.name
    let title = req.params.titulo
    let nomAlbum = coleccion.find(x => x.nombre == name).at(0)
    if (nomAlbum != null) {
        let cancion = nomAlbum.song.find(x => x.titulo == title).at(0)
        if (cancion != null) {
            let iColeccion = coleccion.indexOf(nomAlbum)
            let iCancion = nomAlbum.song.indexOf(cancion)
            coleccion[iColeccion].song.splice(iCancion, 1)
            res.send("Borrado")
        }
        else res.status(404, "No Found").send()
    }
    else res.status(404, "No Found").send()
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