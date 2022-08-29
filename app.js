import express, { json } from 'express';
//importa dependencia de la biblioteca morgan
import morgan from 'morgan';
//importa archivo .env - variables de entorno
import 'dotenv/config';
//importar el archivo usuarioRoutes del archivo usuario.routes.js
import cancionRoutes from './routes/cancion.routes';

import database from './database'
//crea la aplicacion 
const app = express();


//Definimos el puerto
const port = process.env.PORT || 3001
//Middlewire
//lee el body en formato json
app.use(json());
//imprime las acciones hacia cada endopoint en la terminal
app.use(morgan('dev'));
//endpoints
app.use(cancionRoutes)

// app.use(database)


//Escuchamos la puerto
app.listen(port, () => {
    console.log(`Escuchando pedidos en PORT: ${port}`)
})