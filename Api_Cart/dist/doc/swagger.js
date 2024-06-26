"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import DotEnv
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV == 'DEV') {
    dotenv_1.default.config({ debug: true });
}
const ENV = `${process.env.NODE_ENV == 'DEV' ? 'Desarrollo' : 'Pruebas'}`;
const HTTP = `${process.env.NODE_ENV == 'DEV' ? 'http' : 'https'}`;
exports.default = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: `Documentación ${process.env.API_NAME} | ${ENV}`,
            version: "1.0.0",
            description: `La \`Documentación\` de una API, se trata de un libro de instrucciones interactivo que muestra a quien accede a la plataforma su estructura y organización para facilitarle el trabajo, evitando que tengan que entretenerse en investigar las funcionalidades o perderse en pruebas improductivas`,
            license: {
                name: "DIRECCIÓN DE TECNOLOGÍAS DE LA INFORMACIÓN",
                url: "https://www.delasalle.edu.mx/"
            }
        },
        host: `${process.env.API_HOST}:${process.env.API_PORT}`,
        basePath: "/v1",
        servers: [
            {
                url: `http://${process.env.API_HOST}:${process.env.API_PORT}`,
                description: `Servidor de ${ENV}`
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: `${HTTP}`,
                    scheme: "bearer",
                    bearerFormat: 'JWT'
                },
            },
            responses: {
                UnauthorizedError: {
                    description: 'Access token is missing or invalid'
                }
            }
        }
    },
    apis: ["./routes/*.ts"]
};
