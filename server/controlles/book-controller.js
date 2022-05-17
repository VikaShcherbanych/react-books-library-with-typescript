const bookService = require("../service/book-service");

class BookController {
  async addBook(req, res, next) {
    try {
      const newBook = { ...req.body };
      const book = await bookService.addBook(newBook, req.user._id);
      res.json({
        status: "success",
        code: 201,
        data: {
          book,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const { bookId } = req.params;
      await bookService.deleteBook(bookId);
      res.json({
        status: "success",
        code: 200,
        message: "Book deleted",
      });
    } catch (e) {
      next(e);
    }
  }

  async getBooks(req, res, next) {
    try {
      const books = await bookService.getBooks(req.user._id);
      res.json({
        status: "success",
        code: 200,
        data: {
          books,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BookController();
