import { Router } from 'express'
const router = Router()
import {leerPlaylist, crearColeccion, leerColeccion,
    actualizarColeccion,borrarColeccion,leerCanciones,
    leerCancion,crearCancion, actualizarCancion, borrarCancion} from '../controllers/cancion.controllers'
// ----------------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------------
//Endpoints

router.get('/lista', leerPlaylist)

router.post('/lista', crearColeccion)
 
router.get('/lista/:name', leerColeccion)

router.put('/lista/:name', actualizarColeccion)

router.delete('/lista/:name', borrarColeccion)


// ----------------------------------------------------------------------------------
//PARTE 2

router.get('/lista/:name/song', leerCanciones)

router.get('/lista/:name/song/:titulo', leerCancion)

router.post('/lista/:name/song', crearCancion)

router.put('/lista/:name/song/:titulo', actualizarCancion)

router.delete('/lista/:name/song/:titulo', borrarCancion)

export default router

// ----------------------------------------------------------------------------------
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