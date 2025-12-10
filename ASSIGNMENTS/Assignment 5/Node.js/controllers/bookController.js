const Book = require('../models/book')

const createBook = async (req, res) => {
    try {
        const { title, author, publishedYear, genre } = req.body;
        const newBook = new Book({ title, author, publishedYear, genre });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const getAllBooks = async (req, res) => {
    try {
        const { genre } = req.query;
        let query = {};
        if (genre) {
            query.genre = genre;
        }
        const books = await Book.find(query).sort({ publishedYear: 1 });
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getBooksById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, publishedYear, genre } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            id, { title, author, publishedYear, genre }, { new: true }
        );
        if (!updatedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports={createBook,getAllBooks,getBooksById,updateBook,deleteBook};