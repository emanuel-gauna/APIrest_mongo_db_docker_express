import mongoose from "mongoose"; // requerimos  el modulo de mongoose
//creamos un esquema o modelo para nuestra base de datos, se llama "usuario" y tiene los siguientes campos: nombre (nombre del usuario), email

const bookSchema = new mongoose.Schema(
    {//creamos el esquema del modelo como un objeto
    title: String,
    author: String,
    genre: String,
    publication_date: String,
}
);

export const  Book = mongoose.model("Book", bookSchema);//exportamos el modelo con el metodo "model"
 