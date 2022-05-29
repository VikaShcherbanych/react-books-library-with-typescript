import React from 'react';
import { IBook } from '../../models/IBook';

import BookItem from '../BookItem/BookItem';
import s from './BookList.module.css';

interface IPropBooks {
  books: IBook[];
}

const BookList: React.FC<IPropBooks> = ({ books }: IPropBooks) => {
  return (
    <ul className={s.bookCardsList}>
      {books.map((book, index) => (
        <BookItem book={book} key={book.id + index} />
      ))}
    </ul>
  );
};
export default BookList;
