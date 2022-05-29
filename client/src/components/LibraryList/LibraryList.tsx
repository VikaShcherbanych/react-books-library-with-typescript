import React from 'react';
import { IBookFromLibrary } from '../../models/IBookFromLibrary';

import LibraryItem from '../LibraryItem/LibraryItem';
import s from './LibraryList.module.css';

interface IPropBooks {
  books: IBookFromLibrary[];
}

const LibraryList: React.FC<IPropBooks> = ({ books }: IPropBooks) => {
  return (
    <ul className={s.bookCardsList}>
      {books.map(book => (
        <LibraryItem book={book} key={book.id} />
      ))}
    </ul>
  );
};
export default LibraryList;
