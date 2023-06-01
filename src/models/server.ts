import express, { Application } from 'express';
import routesSegUsuario from '../routes/seg_usuario.rou';
import { SegUsuario } from './seg_usuario.mod';

class Server{
    private app:Application;
    private port:string;

    constructor(){
        this.app=express();
        this.port=process.env.PORT||'3000';
        this.listen();
        this.midlewares();
        this.routes();
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Aplicacion corriendo en ${this.port}`);
        });
    }
    routes(){
        this.app.use('/api/segUsuario',routesSegUsuario);
    }
    midlewares(){
        this.app.use(express.json());
    }
}

export default Server;