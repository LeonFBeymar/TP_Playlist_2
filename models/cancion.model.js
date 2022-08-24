import mongoose from "mongoose";

const cancionShema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    numero: {
        type: Int,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    song: {
        type: Array,
        required: false
    }
 },
 {
    timestamps: true,
    versionKey: false
}
 )

 const Cancion = mongoose.model('Cancion', cancionShema)

export default Cancion