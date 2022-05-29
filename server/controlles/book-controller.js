const bookService = require("../service/book-service");

class BookController {
  async addBook(req, res, next) {
    try {
      const newBook = req.body.book;
      const book = await bookService.addBook(newBook, req.user.id);
      res.json({
        status: "success",
        code: 201,
        data: {
          ...book,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { bookId } = req.params;
      const book = await bookService.deleteBook(bookId);
      res.json({
        status: "success",
        code: 200,
        message: "Book deleted",
        id: book.id,
      });
    } catch (e) {
      next(e);
    }
  }

  async getBooks(req, res, next) {
    try {
      const books = await bookService.getBooks({ owner: req.user.id });
      res.json(books);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BookController();
