import  express from "express";//npm i express
import mongoose from "mongoose";//npm i moongoose
import { config } from "dotenv";//npm i dontenv
import bodyParser from "body-parser";//npm i body-parser
config()
import bookRouter  from "./routes/book.routes.js"

//accedemos a express 
const app = express();
app.use(bodyParser.json())//npm i body-parser// parseador de bodies

//conexion a la base de datos de MONGO
mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME })
const db = mongoose.connection;

app.use( "/books" , bookRouter)

//levantando el servidor
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server is running on ${port}`))