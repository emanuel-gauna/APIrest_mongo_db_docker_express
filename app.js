import { config  } from "dotenv"; // instalar (npm i dotenv) y requerir config
import env from "env-var";
import { parseArgs } from 'node:util';
config();

config(); // cargar variables de entorno
// obtener una variable de la base de
console.log(process.env.PORT)
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)

// variable extricta(number) y requerida de env-var

const PORT = env.get("PORT").required().asPortNumber();

console.log("El puerto es: ", PORT);
