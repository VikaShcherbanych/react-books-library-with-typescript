import React from "react";
import { Link } from "react-router-dom";

import notImage from "../../images/not-found-img.jpeg";
import { IBook } from "../../models/IBook";
import s from "./BookItem.module.css";

interface IPropBook {
  book: IBook;
}

const BookItem: React.FC<IPropBook> = ({ book }: IPropBook) => {
  return (
    <li className={s.bookCardWrap}>
      <Link className={s.bookCardLink} to={`/books/${book.id}`}>
        <img
          src={
            book.volumeInfo.imageLinks?.thumbnail
              ? book.volumeInfo.imageLinks.thumbnail
              : notImage
          }
          alt={book.volumeInfo.title}
          className={s.bookCardPoster}
          width="260"
          height="390"
        />
        <h2 className={s.bookCardTitle}>
          {book.volumeInfo?.title.length > 27
            ? `${book.volumeInfo.title.slice(0, 25)}...`
            : book.volumeInfo.title}
        </h2>
        <p className={s.bookCardAuthor}>
          {book.volumeInfo.authors
            ? book.volumeInfo.authors[0].slice(0, 25)
            : "The author is unknown"}
        </p>
      </Link>
    </li>
  );
};
export default BookItem;
