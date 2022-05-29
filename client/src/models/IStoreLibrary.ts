import { IBookFromLibrary } from "./IBookFromLibrary";

export interface IStoreLibrary {
  books: IBookFromLibrary[] | [];
  isLoading: boolean;
  error: string;
}