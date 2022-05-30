const BookModel = require("../models/book-model");
const ApiError = require("../exceptions/api-error");

class BookService {
  async addBook(userBook, userId) {
    const { id } = userBook;
    const copyOfBooks = await BookModel.find({ owner: userId });
    if (copyOfBooks.some(book => book.id === id)) {
      throw ApiError.BadRequest(`The book ${userBook.title} already exists`);
    }
    const newBook = { ...userBook, owner: userId };
    const book = await BookModel.create(newBook);
    return {
      book,
    };
  }

  async deleteBook(id) {
    const result = await BookModel.findOneAndDelete({ id });
    if (!result) {
      throw new NotFound(`Book with id = ${id} not found`);
    }
    return result;
  }

  async getBooks(user) {
    const books = await BookModel.find(user);
    return books;
  }
}

module.exports = new BookService();
