import { toast } from 'react-toastify';
import { createAsyncThunk } from '@reduxjs/toolkit';

import BookService from '../../../services/booksFromBD/BooksService';
import { IBookFromLibrary } from "../../../models/IBookFromLibrary";

interface IRequestParams {
  book: IBookFromLibrary;
  userId: string;
}

export const getBooks = createAsyncThunk(
  'library/getBooks',
  async (_, thunkAPI) => {
    try {
      const response = await BookService.fetchBooks();
      return response.data;
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);

export const addBook = createAsyncThunk(
  'library/addBook',
  async ({ book, userId }: IRequestParams, thunkAPI) => {
    try {
      const response = await BookService.addBook(book, userId);
      return response.data;
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);

export const deleteBook = createAsyncThunk(
  'library/deleteBook',
  async (bookId: string, thunkAPI) => {
    try {
      const response = await BookService.deleteBook(bookId);
      return response.data;
    } catch (e: any) {
      toast.error(e.response.data.message || e.message);
      return thunkAPI.rejectWithValue(e.response.data.message || e.message);
    }
  },
);