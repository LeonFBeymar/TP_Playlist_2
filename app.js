const express = require('express')

const app = express();

const port = 3000;

//midlewire
app.use(express.json())

var coleccion = [
                { 
                    nombre : "Lan",
                    numero: 30,
                    descripcion: "sadcorever",
                    song: [
                        {
                            titulo : "Guerra",
                            artista: "Porta",
                            nomAlbum: "Lan",
                            añoEdicion: 2003
                        },
                        {
                            titulo : "Post Malone",
                            artista: "Sunflower",
                            nomAlbum: "Lan",
                            añoEdicion: 2005
                        }
                    ]
                }
            ]
//req(pedido) es lo que recibimos del navegador
//res(respuesta) es lo que envia el servidor

//le pedimos que nos devuelva algo al servidor
app.get('/lista', (pedido,respuesta) => {
    respuesta.send(coleccion)
})



// Le eviamos una lista al servidor y esta nos devuelve la lista
app.post('/lista', (pedido,respuesta) => {
    let canciones = pedido.body;
    let cancion = canciones.filter(x => x.nombre)
    if ( cancion == "" ) {
        respuesta.status(400).send("Bad Request")
    }
    else
    {
        coleccion = coleccion.concat(pedido.body)
        respuesta.status(201, "created")
        respuesta.send(pedido.body)
    }
    console.log(coleccion);
})

app.get('/lista/:name', (pedido,respuesta) => 
{
    let name = pedido.params.name
    let ver = coleccion.some(x => x.nombre == name)
    if (ver == false) {
        respuesta.status(404,"No Found").send()    
    }
    else
    {
        let cancion = coleccion.find(x => x.nombre == name)
        respuesta.send(cancion.descripcion)
    }
    console.log(coleccion);
})




app.put('/lista/:name', (pedido,respuesta) => {
    console.log("Otro");
    let name = pedido.params.name
    let ifExist = coleccion.some(x => x.nombre == name)
    if (ifExist == false) {
        respuesta.status(404, "No Found").send()
    }
    else
    {
        var cancion = coleccion.find(x => x.nombre == name)
        var remplazo = pedido.body[0]
        console.log(remplazo);
        if (remplazo.nombre != cancion.nombre) {
            respuesta.status(409, "Conflict").send();
        }
        else{
            var pocision = 0;
            coleccion.forEach((item, index) => {
                if (item.nombre == remplazo.nombre) {
                    pocision = index;
                }
            });
            cancion = remplazo;
            coleccion[pocision] = cancion;
            respuesta.status(204, "No Content").send()
        }
    }
})

app.delete('/:name', (pedido, respuesta) => {
    let ver = coleccion.some(x => x.nombre == pedido.params.name)
    if (ver == true) {
        coleccion = coleccion.filter(x => x.nombre != pedido.params.name)
        respuesta.status(204, "No content").send();
        console.log("Dentro del if Delete");
        console.log(coleccion);
    }
    else respuesta.status(404, "No found").send()
})


app.listen(port)

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