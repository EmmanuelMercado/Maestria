import { Router,Request,Response, NextFunction } from "express";
import CartController from "../controllers/cart.controller"


const route: Router = Router();


/**
 
* @swagger
 
* /api/cart/v1/health:
 
*
 
*   get:
 
*     summary: Prueba de conexión para validar que la API REST se encuentra en línea y funcionando correctamente.
 
*     tags: [Carrito]
 
*     responses:
 
*       200:
 
*         description: Código de éxito. La solicitud ha sido recibida, entendida o procesada por el buscador
 
*       500:
 
*         description: El servidor ha encontrado una situación que no sabe cómo manejarla.
 
*/
route.get("/health",CartController.health)

export default route;