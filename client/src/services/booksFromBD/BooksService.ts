import $api from "../../http";
import { AxiosResponse } from "axios";
import { IBookFromLibrary } from "../../models/IBookFromLibrary";

// interface IBookId {
//   bookId: string;
// }
interface IResponce {
  message: string;
  status: string;
  code: number;
}

export default class BooksService {
  static async fetchBooks(): Promise<AxiosResponse<IBookFromLibrary[]>> {
    return $api.get<IBookFromLibrary[]>("/books");
  }

  static async addBook(
    book: IBookFromLibrary,
    userId: string
  ): Promise<AxiosResponse<IBookFromLibrary>> {
    return $api.post<IBookFromLibrary>("/", { book, userId });
  }

  static async deleteBook(bookId: string): Promise<AxiosResponse<IResponce>> {
    return $api.delete(`/${bookId}`);
  }
}
