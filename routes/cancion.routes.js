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
router.get('/lista', async (rec, res)=>{
    try{
        const cancion = await Cancion.find()
        res.send(cancion)
    }catch (err){
        res.status(500).send(err)
    }
})

//POST
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

router.get('/lista/:name/song', async(req, res) => {
    try {
        const name = req.params.name
        const cancion = await Cancion.findOne({nombre: name})
        res.send(cancion.song)
    } catch (err) {
        res.status(500).send(err)
    }
})


router.get('/lista/:name/song/:titulo', async(req, res) => {
    try {
        let name = req.params.name
        let titles = req.params.titulo
        const cancion = await Cancion.findOne({nombre:name})
        const songCancion = await cancion.song.find(x => x.titulo == titles)
        res.send(songCancion)
    } catch (err) {
        res.status(500).send(err)
    }
})


router.post('/lista/:name/song', async(req, res) => {
    try {
        let name = req.params.name  
        let songCancion = req.body
        const cancion = await Cancion.findOne({nombre:name})
        await cancion.song.push(songCancion)|
        await Cancion.findOneAndUpdate({nombre:name}, cancion)
        res.send("Posteado")
    } catch (err) {
        res.status(500).send(err)
    }
})


router.put('/lista/:name/song/:titulo', async (req, res) => {
    try {
        let name = req.params.name;
        let title = req.params.titulo;
        let cancionUpdate = req.body;
        let cancion = await Cancion.findOne({nombre:name});
        let i = await cancion.song.find(x => x.titulo == title)
        i.artista = cancionUpdate.artista
        i.añoEdicion = cancionUpdate.añoEdicion                                                                                                                                                                                                                                        
        i.nomAlbum = cancionUpdate.nomAlbum
        await Cancion.findOneAndUpdate({nombre:name},cancion);
        res.send("Actualizado");
    } catch (err) {
        res.status(500).send(err)
    }
})

router.delete('/lista/:name/song/:titulo', async(req, res)=> {
    try {
        let name = req.params.name
        let title = req.params.titulo
        const cancion = await Cancion.findOne({nombre:name})
        let songCancion = cancion.song.find(x => x.titulo == title)
        let pocision = cancion.song.indexOf(songCancion)
        cancion.song.splice(pocision,1)
        await Cancion.findOneAndUpdate({nombre:name}, cancion)
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