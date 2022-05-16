import $api from "../http";
import { AxiosResponse } from "axios";
import { IBook } from "../models/IBook";

export default class BooksService {
  static fetchBooks(): Promise<AxiosResponse<IBook[]>> {
    return $api.get<IBook[]>("/userBooks");
  }
}

// no users, only books
