import express from 'express'
const router = express.Router()
import Cancion from '../models/cancion.model'

// var coleccion = [
    // {
    //     "nombre": "Lan",
    //     "numero": 30,
    //     "descripcion": "sadcorever",
    //     "song": [
    //         {
    //             "titulo": "Guerra",
    //             "artista": "Porta",
    //             "nomAlbum": "Lan",
    //             "añoEdicion": 2003
    //         },
    //         {
    //             "titulo": "Post Malone",
    //             "artista": "Sunflower",
    //             "nomAlbum": "Lan",
    //             "añoEdicion": 2005
    //         }
    //     ]
    // }
// ]

//Endpoints

//GET
// router.get('/lista', (req, res) => {
//     res.send(coleccion)
//     res.send(accessLogStream)
// })

router.get('/lista', async (rec, res)=>{
    try{
        const cancion = await Cancion.find()
        res.send(cancion)
    }catch (err){
        res.status(500).send(err)
    }
})

//POST
// router.post('/lista', (req, res) => {
//     let canciones = req.body;
//     let cancion = canciones.find(x => x.nombre)
//     if (cancion == "") {
//         res.status(400).send("Bad Request")
//     }
//     else {
//         coleccion = coleccion.concat(req.body)
//         res.status(201, "created").send(req.body)
//     }
// })

router.post('/lista', async(req, res)=>{
    try{
        const cancion = req.body
        await Cancion.create(cancion)
        res.status(201).send(cancion)
    }catch(err){
        res.status(500).send(err)
    }
})

//GET   
// router.get('/lista/:name', (req, res) => {
//     let name = req.params.name
//     let cancion = coleccion.find(x => x.nombre == name)
//     if (cancion == null) {
//         res.status(404, "No Found").send()
//     }
//     else res.send(cancion.descripcion)
// })

router.get('/lista/:name', async(req, res) => {
    try {
        const name = req.params.name
        const cancion = await Cancion.findOne({nombre: name})
        res.send(cancion)
    } catch (error) {
        res.status(500).send(err)
    }
})
//PUT
// router.put('/lista/:name', (req, res) => {
//     let name = req.params.name;
//     let cancion = coleccion.find(x => x.nombre == name)
//     if (cancion != null) {
//         if (req.body[0].nombre == name) {
//             let a = coleccion.indexOf(cancion)
//             coleccion[a].descripcion = req.body[0].descripcion
//             coleccion[a].numero = req.body[0].numero
//             res.status(204, "No Content").send();
//         }
//         else res.status(409, "Conflict").send();
//     }
//     else res.status(404, "No Found").send();
// })

router.put('/lista/:name', async(req, res) => {
    try {
        let name = req.params.name
        let cancion = req.body
        await Cancion.findOneAndUpdate({nombre:name}, cancion)
        const cancionResponse = await Cancion.findOne({nombre: name})
        res.send(cancionResponse)
    } catch (err) {
        res.status(500).send(err)
    }
})



//DELETE
// router.delete('/lista/:name', (req, res) => {
//     if ((coleccion.some(x => x.nombre == req.params.name)) == true) {
//         coleccion = coleccion.find(x => x.nombre != req.params.name)
//         res.status(204, "No content").send();
//     }
//     else res.status(404, "No found").send()
// })

router.delete('/lista/:name', async(req, res) => {
    try {
        let name = req.params.name
        await Cancion.findOneAndRemove({nombre: name})
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
})








//PARTE 2
// router.get('/lista/:name/song', (req, res) => {
//     let name = req.params.name
//     let cancion = coleccion.find(x => x.nombre == name)
//     if (cancion != true) {
//         res.send(cancion.song)
//     }
//     else res.status(404).send("No se encuentra la lista")
// })

router.get('/lista/:name/song', async(req, res) => {
    try {
        const name = req.params.name
        const cancion = await Cancion.findOne({nombre: name})
        res.send(cancion.song)
    } catch (err) {
        res.status(500).send(err)
    }
})



// router.get('/lista/:name/song/:titulo', (req, res) => {
//     let name = req.params.name
//     let title = req.params.titulo
//     let nomAlbum = coleccion.find(x => x.nombre == name)
//     if (nomAlbum != null) {
//         let cancion = nomAlbum.song.find(x => x.titulo == title)
//         if (cancion != null)
//             res.send(cancion)
//         else res.status(404, "No Found").send("No se encuentra la cancion")
//     }
//     else res.status(404, "No Found").send("No se encuentra la lista")
// })

router.get('/lista/:name/song/:titulo', async(req, res) => {
    try {
        let name = req.params.name
        let titles = req.params.titulo
        const cancion = await Cancion.findOne({nombre:name})
        const songCancion = await cancion.song.find(x => x.titulo = titles)
        res.send(songCancion)
    } catch (err) {
        res.status(500).send(err)
    }
})




// router.post('/lista/:name/song', (req, res) => {
//     let name = req.params.name
//     let nomAlbum = coleccion.find(x => x.nombre == name)
//     if (nomAlbum != null) {
//         if (req.body.titulo != null && req.body.titulo != "") {
//             nomAlbum.song.push(req.body)
//             res.send(nomAlbum)
//         }
//         else res.status(404).send("Bad request")
//     }
//     else res.status(404).send("No se encuentra la lista")
// })

router.post('/lista/:name/song', async(req, res) => {
    try {
        let name = req.params.name  
        let songCancion = req.body
        const cancion = await Cancion.findOne({nombre:name})
        await cancion.song.push(songCancion)
        await Cancion.replaceOne({nombre:name}, cancion)
        res.send("Posteado")
    } catch (err) {
        res.status(500).send(err)
    }
})



// router.put('/lista/:name/song/:titulo', (req, res) => {
//     let name = req.params.name;
//     let title = req.params.titulo;
//     let nomAlbum = coleccion.find(x => x.nombre == name)
//     if (nomAlbum != null) {
//         let cancion = nomAlbum.song.find(x => x.titulo == title)
//         if (cancion != null) {
//             if (req.body.titulo == title) {
//                 let iColeccion = coleccion.indexOf(nomAlbum)
//                 let iCancion = nomAlbum.song.indexOf(cancion)
//                 coleccion[iColeccion].song[iCancion].artista = req.body.artista;
//                 coleccion[iColeccion].song[iCancion].añoEdicion = req.body.añoEdicion;
//                 coleccion[iColeccion].song[iCancion].nomAlbum = req.body.nomAlbum;
//                 res.send("Actualizado")
//             }
//             else res.status(404, "No Found").send()
//         }
//         else res.status(404, "No Found").send()
//     }
//     else res.status(404, "No Found").send()
// })


router.put('/lista/:name/song/:titulo', async (req, res) => {
    try {
        let name = req.params.name
        let titles = req.params.titulo
        let cancionUpdate = req.body
        // await Cancion.findOneAndUpdate({nombre:name,titulo:titles}, cancionUpdate)
        // res.send()
        let cancion = await Cancion.findOne({nombre:name})
        let songCancion = await cancion.song.find(x => x.titulo == titles)
        let pocision = await cancion.song.indexOf(songCancion)
        cancion.song[pocision].nomAlbum = cancionUpdate.nomAlbum
        cancion.song[pocision].añoEdicion = cancionUpdate.añoEdicion
        cancion.song[pocision].artista = cancionUpdate.artista
        await Cancion.replaceOne({nombre:name}, cancion)
        res.send("Actualizado")

    } catch (err) {
        res.status(500).send(err)
    }
})



// router.delete('/lista/:name/song/:titulo', (req, res) => {
//     let name = req.params.name
//     let title = req.params.titulo
//     let nomAlbum = coleccion.find(x => x.nombre == name)
//     if (nomAlbum != null) {
//         let cancion = nomAlbum.song.find(x => x.titulo == title)

//         if (cancion != null) {
//             let iColeccion = coleccion.indexOf(nomAlbum)
//             let iCancion = nomAlbum.song.indexOf(cancion)
//             coleccion[iColeccion].song.splice(iCancion, 1)
//             res.send("Borrado")
//         }
//         else res.status(404, "No Found").send()
//     }
//     else res.status(404, "No Found").send()
// })

router.delete('/lista/:name/song/:titulo', async(req, res)=> {
    try {
        let name = req.params.name
        let title = req.params.titulo
        const cancion = await Cancion.findOne({nombre:name})
        let songCancion = cancion.song.find(x => x.titulo == title)
        let pocision = cancion.song.indexOf(songCancion)
        cancion.song.splice(pocision, 1)
        await Cancion.replaceOne({nombre:name}, cancion)
        res.send("Borrado")
    } catch (error) {
        
    }
})

export default router


// {
//     "titulo": "Skill",
//     "artista": "Hero",
//     "nomAlbum": "Lan",
//     "añoEdicion": 2003
// }



// [
//     {
//       "nombre": "Moderna",
//       "descripcion": "sadcoreverfannnn",
//       "numero":232,
//       "song": [
//         {
//           "titulo": "Sunflower",
//           "artista":"Gan",
//           "nomAlbum": "Moderna",
//           "añoEdicion": 3500
//         },
//         {
//           "titulo": "Linkin Park",
//           "artista":"Loop",
//           "nomAlbum": "Moderna",
//           "añoEdicion": 4000
//         },
//         {
//           "titulo": "Porta",
//           "artista":"Sam",
//           "nomAlbum": "Moderna",
//           "añoEdicion": 7000
//         }
//       ]
//     }
//   ]