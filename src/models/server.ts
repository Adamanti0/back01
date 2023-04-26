import express, { Application } from 'express';
import routesUser from '../routes/user.rou';

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
         console.log(`Puerto ${this.port}`);
      });
   }
   routes(){
      this.app.use('/api/user',routesUser);
   }
   midlewares(){
      this.app.use(express.json());
   }
}

export default Server;