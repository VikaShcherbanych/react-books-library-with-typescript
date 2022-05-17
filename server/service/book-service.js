const BookModel = require("../models/book-model");
const ApiError = require("../exceptions/api-error");

class BookService {
  async addBook(book, userId) {
    const { id } = book;
    const copyOfBook = await BookModel.findOne({ id });
    if (copyOfBook) {
      throw ApiError.BadRequest(`The book ${book.title} already exists`);
    }
    const userBook = await BookModel.create({
      title: book.title,
      authors: book.authors,
      categories: book.categories,
      imageLink: book.imageLink,
      previewLink: book.previewLink,
      user: userId,
      id,
    });

    return {
      userBook,
    };
  }

  async deleteBook(id) {
    const result = await BookModel.findByIdAndRemove(id);
    if (!result) {
      throw new NotFound(`Book with id = ${id} not found`);
    }
  }

  async getBooks(id) {
    const books = await BookModel.find({ user: id });
    return books;
  }
}

module.exports = new BookService();
