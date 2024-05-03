"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_1 = __importDefault(require("./doc/swagger"));
const cart_routes_1 = __importDefault(require("./routes/cart.routes"));
const api = (0, express_1.default)();
const ENV = process.env;
api.use(express_1.default.json());
api.use(express_1.default.urlencoded({ extended: true }));
(() => __awaiter(void 0, void 0, void 0, function* () {
    //Variables de entorno DotEnv
    if (ENV.NODE_ENV == "DEV ") {
        dotenv_1.default.config({
            debug: true,
            encoding: "UTF-8"
        });
    }
    //Documentación de la API
    if (ENV.NODE_ENV != "PRO ") {
        const specs = (0, swagger_jsdoc_1.default)(swagger_1.default);
        api.use("/api/doc/v1/", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(specs));
    }
    //Definición de Rutas de la API
    api.use("/api/cart/v1/", cart_routes_1.default);
}))();
api.listen(ENV.API_PORT, () => {
    console.log("Servidor Express funcionando");
});
