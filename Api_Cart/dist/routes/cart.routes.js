"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const route = (0, express_1.Router)();
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
route.get("/health", cart_controller_1.default.health);
exports.default = route;
