require('dotenv').config();

const cors = require('cors'); 

const sequelize = require("./database/sequelizeConfig")
const User = require('./database/models/userModel');
const userRoutes = require("./routes/userRoutes")

const express = require("express")
const app = express()



const PORT = process.env.HOST_PORT


app.use(express.json());

app.use(cors())

app.use("/users",userRoutes)

app.listen(PORT, async()=>{
    try{
        await sequelize.authenticate()
        console.log("Conexión establecida correctamente");
        
        await sequelize.sync({alter:true,logging:false})
        console.log("Modelos sincronizados con la base de datos");

        console.log(`Servidor iniciado en http://localhost:${PORT}`);
    }
    catch (error){
        console.error('Error al conectar con la base de datos:', error);
    }
})