import mongoose from "mongoose";

const cancionSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    numero: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    song: [ {
            titulo: {
                type: String,
                required: true
            },
            artista: {
                type: String,
                required: true
            },
            nomAlbum: {
                type: String,
                required: true
            },
            añoEdicion: {
                type: Number,
                required: true
            }
        }
        // type: Array,
        // required: true
    ]
 },
    {
        timestamps: true,
        versionKey: false
    }
 )

const Cancion = mongoose.model('Cancion', cancionSchema)

export default Cancion