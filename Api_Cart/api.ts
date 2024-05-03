import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv"

import SwaggerUI from "swagger-ui-express"
import SwaggerDoc from "swagger-jsdoc"
import  SwaggerOptions  from "./doc/swagger";

import CartRoutes from "./routes/cart.routes"

const api = express();
const ENV = process.env;
   
api.use(express.json());
api.use(express.urlencoded({extended: true}));

(async()=>{
    //Variables de entorno DotEnv
    if(ENV.NODE_ENV =="DEV "){
        dotenv.config({ 
            debug:true,
            encoding: "UTF-8"
        }) 
    }
    //Documentación de la API
    if(ENV.NODE_ENV != "PRO "){
        const specs = SwaggerDoc(SwaggerOptions);
        api.use("/api/doc/v1/",SwaggerUI.serve, SwaggerUI.setup(specs))
    }
    //Definición de Rutas de la API
    api.use("/api/cart/v1/",CartRoutes)
    

})();

api.listen(ENV.API_PORT,()=>{
    console.log("Servidor Express funcionando");
    
})