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

//midlewire
app.use(json());
//imprime las acciones hacia cada endopoint en la terminal
app.use(morgan('dev'));

app.use(cancionRoutes)

const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log(`Escuchando pedidos en PORT: ${port}`)
})


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