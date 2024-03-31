import  { Router }  from "express";
import { Book }  from "../models/book.model.js";

const bookRouter = Router();

//middleware
const getBook = async(req,res,next) =>{
    let book;
    const { id } = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message: "El id del libro no es valido"
        })
    }
    try {
        book = await Book.findById(id);
        if(!book){
            return res.status(404).json({
             message: "El libro no fue encontrado"   
            })
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    res.book = book;
    next()
}

// Get all books
bookRouter.get("/",  async (req, res) =>{
    try {
        const books = await Book.find();
        if(books.length === 0){
           return res.status(204).json([])
        }
        const  RES = {
            books,
            total: books.length,
        }
        return res.status(200).json(RES)
    } catch (error) {
       return res.status(500).json({message: error});
    }
})

//crear libro
bookRouter.post('/', async (req,res) =>{
    const {title, author, genre, publication_date} = req?.body;
    if(!title || !author || !genre || !publication_date){
return res.status(400).json({
    message: "los campos son title, author, genre, publication_date obligatorios"
 })
    }
   const book = new Book ({...req.body });
   try {
       await book.save()
       return res.status(201).json(book);
   }catch(e){
       return res.status(400).json({ message : 'Error en el servidor' })
   }
})
bookRouter.get("/:id", getBook, async (req, res) =>{
    return res.status(200).json(res.book)
})
bookRouter.put("/:id", getBook, async(req,res) =>{
    try {
        const book = res.book // traemos el book del res que esta en el middleware
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updateBook = await book.save()
        return res.json(updateBook)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
})

bookRouter.patch("/:id", getBook, async(req,res) =>{
    if(!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date){
        return res.status(400).json({message:"almenos uno de estos datos debe ser enviado: Titulo, autor , genero, fecha de publicación"})
    }
    try {
        const book = res.book // traemos el book del res que esta en el middleware
        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.genre = req.body.genre || book.genre;
        book.publication_date = req.body.publication_date || book.publication_date;

        const updateBook = await book.save()
        return res.json(updateBook)
    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
})
bookRouter.delete('/:id', getBook ,async (req, res)=>{
try {
    const  book = res.book
    await book.deleteOne({
        _id: book._id
    });
    res.json({msg:`Se ha eliminado el libro ${book.title}`})
} catch (error) {
 res.status(500).json({message: "Error al intentar borrar"})
}
})
   
export default bookRouter;