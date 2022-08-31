import Cancion from "../models/cancion.model";

export const leerPlaylist = async (rec, res)=>{
    try{
        const cancion = await Cancion.find()
        res.send(cancion)
    }catch (err){
        res.status(500).send(err)
    }
}
// ----------------------------------------------------------------------------------
export const crearColeccion = async(req, res)=>{
    try{
        const cancion = req.body
        await Cancion.create(cancion)
        res.status(201).send(cancion)
    }catch(err){
        res.status(500).send(err)
    }
}
// ----------------------------------------------------------------------------------
export const leerColeccion = async(req, res) => {
    try {
        const name = req.params.name
        const cancion = await Cancion.findOne({nombre: name})
        res.send(cancion)
    } catch (error) {
        res.status(500).send(err)
    }
}
// ----------------------------------------------------------------------------------
export const actualizarColeccion = async(req, res) => {
    try {
        let name = req.params.name
        let cancion = req.body
        await Cancion.findOneAndUpdate({nombre:name}, cancion)
        const cancionResponse = await Cancion.findOne({nombre: name})
        res.send(cancionResponse)
    } catch (err) {
        res.status(500).send(err)
    }
}
// ----------------------------------------------------------------------------------
export const borrarColeccion = async(req, res) => {
    try {
        let name = req.params.name
        await Cancion.findOneAndRemove({nombre: name})
        res.status(204).send()
    } catch (err) {
        res.status(500).send(err)
    }
}


// ----------------------------------------------------------------------------------
// Parte dos
export const leerCanciones = async(req, res) => {
    try {
        const name = req.params.name
        const cancion = await Cancion.findOne({nombre: name})
        res.send(cancion.song)
    } catch (err) {
        res.status(500).send(err)
    }
}
// ----------------------------------------------------------------------------------
export const leerCancion = async(req, res) => {
    try {
        let name = req.params.name
        let titles = req.params.titulo
        const cancion = await Cancion.findOne({nombre:name})
        const songCancion = await cancion.song.find(x => x.titulo == titles)
        res.send(songCancion)
    } catch (err) {
        res.status(500).send(err)
    }
}
// ----------------------------------------------------------------------------------
export const crearCancion = async(req, res) => {
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
}
// ----------------------------------------------------------------------------------
export const actualizarCancion = async (req, res) => {
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
}
// ----------------------------------------------------------------------------------
export const borrarCancion = async(req, res)=> {
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
}
