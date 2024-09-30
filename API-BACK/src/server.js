import express from 'express';
import morgan from 'morgan';
import fileupload from 'express-fileupload';
import cors from 'cors';
import path from 'path';

import userRouter from './routes/userRouter.js';
import entriesRouter from './routes/entriesRouter.js';

const server = express();

//middelware a nivel de aplicacion
server.use(morgan('dev'));
server.use(express.json()); //codifica todo lo que viene desde un formulario y viene por body
server.use(cors());

//implementar el middleware para subir archivos
server.use(fileupload());

//implementar una ruta estática para ser usada desde el front
//para pedir el envío de una imagen o cualquier archivo estático
const staticDir = path.join(process.cwd(),'./src/uploads');
server.use('/uploads',express.static(staticDir)); //"endpoint" para pedir una imagen


//implementacion de las rutas (enrrutadores routers)
server.use(userRouter);
server.use(entriesRouter);


//implementacion middelwares de control de ruta no encontrada y de errores

//middleware de manejo de errores
server.use((error, req, res, next) => {
    console.log(error);

    res.status(error.httpStatus || 500).send({
        status: 'error!!!',
        message: error.message
    });
});

//middelware de ruta no encontrada
server.use((req,res) => {
    res.status(404).send({
        status: 'error',
        message: 'Not Found'
    });
});

export default server;