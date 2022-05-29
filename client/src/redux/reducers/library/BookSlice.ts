import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookFromLibrary } from "../../../models/IBookFromLibrary";
import { IStoreLibrary } from "../../../models/IStoreLibrary";
import { getBooks, addBook, deleteBook } from "./BookActionCreators";

const initialState: IStoreLibrary = {
  books: [],
  isLoading: false,
  error: ''
};

export const bookSlice = createSlice({
    name: 'myLibrary',
    initialState,
    reducers: {},
    extraReducers: {
        [getBooks.fulfilled.type]: (state, action: PayloadAction<IBookFromLibrary[]>) => {
            state.isLoading = false;
            state.books = action.payload;
            state.error = '';
        },
        [addBook.fulfilled.type]: (state, action: PayloadAction<IBookFromLibrary>) => {
            state.isLoading = false;
            state.books = [...state.books, action.payload];
            state.error = '';
        },
        [deleteBook.fulfilled.type]: (state, action: PayloadAction<IBookFromLibrary>) => {
            state.isLoading = false;
            state.books = state.books.filter(book => book.id !== action.payload.id);
            state.error = '';
        },
        [getBooks.pending.type]: (state, action: PayloadAction<IBookFromLibrary>) => {
            state.isLoading = true;
        },
        [getBooks.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [addBook.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        [deleteBook.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

export default bookSlice.reducer;