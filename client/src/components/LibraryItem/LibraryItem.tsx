import React from 'react';
import { toast } from 'react-toastify';

import Button from '../../components/Button/Button';
import { IBookFromLibrary } from '../../models/IBookFromLibrary';
import { deleteBook } from '../../redux/reducers/library/BookActionCreators';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import s from './LibraryItem.module.css';

interface IPropBook {
  book: IBookFromLibrary;
}

const LibraryItem: React.FC<IPropBook> = ({ book }: IPropBook) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state);
  const handleDeleteBookFromLibrary = (id: string) => {
    dispatch(deleteBook(id));
    if (!store.library.error) {
      toast.success('Book deleted!');
    }
  };
  return (
    <li className={s.bookCardWrap} key={book.id}>
      <a href={book.previewLink} className={s.bookCardLink}>
        <img
          src={book.imageLink}
          alt={book.title}
          className={s.bookCardPoster}
          width="260"
          height="340"
        />
      </a>
      <h2 className={s.bookCardTitle}>
        {book.title.length > 27 ? `${book.title.slice(0, 25)}...` : book.title}
      </h2>
      <p className={s.bookCardAuthor}>
        {book.authors.length > 0
          ? book.authors[0].slice(0, 25)
          : 'The author is unknown'}
      </p>
      <p className={s.bookCardCategory}>
        Category:{' '}
        {book.categories.length > 0 ? book.categories[0] : 'no category'}
      </p>
      <Button
        onClick={() => handleDeleteBookFromLibrary(book.id)}
        text="Delete from library"
      />
    </li>
  );
};
export default LibraryItem;
