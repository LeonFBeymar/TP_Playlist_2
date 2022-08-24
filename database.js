
import mongoose from "mongoose";
import 'dotenv/config'

const database = process.env.DATABASE

mongoose.connect(database, () => {
    console.log('Base de datos conectada...')
})
    .catch(err => console.log(err))
