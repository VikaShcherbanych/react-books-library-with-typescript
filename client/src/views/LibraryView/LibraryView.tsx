import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Button from "../../components/Button/Button";
import booksService from "../../services/booksFromBD/BooksService";
import s from "./LibraryView.module.css";
import { IBookFromLibrary } from "../../models/IBookFromLibrary";

const LibraryView: React.FC = () => {
  const [library, setLibrary] = useState<IBookFromLibrary[]>([]);

  useEffect(() => {
    booksService.fetchBooks().then((res) => setLibrary(res.data));
  }, []);

  const handleDeleteBookFromLibrary = (id: string) => {
    booksService.deleteBook(id).then((res) => {
      if (res.status === 200) {
        toast.success("Book deleted!");
        booksService.fetchBooks().then((res) => setLibrary(res.data));
      }
    });
  };

  return (
    <>
      {library.length > 0 && (
        <>
          <h1>Your Library</h1>
          <ul className={s.bookCardsList}>
            {library.map((book) => (
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
                  {book.title.length > 27
                    ? `${book.title.slice(0, 25)}...`
                    : book.title}
                </h2>
                <p className={s.bookCardAuthor}>
                  {book.authors
                    ? book.authors[0].slice(0, 25)
                    : "The author is unknown"}
                </p>
                <p className={s.bookCardCategory}>Category: {book?.categories[0]}</p>
                <Button
                  onClick={() => handleDeleteBookFromLibrary(book.id)}
                  text="Delete from library"
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default LibraryView;
