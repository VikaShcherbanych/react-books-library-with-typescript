import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { toast } from "react-toastify";

import Button from "../../components/Button/Button";
import getBookAPI from "../../services/booksFromOpenAPI/getBooks-api";
import { Context } from "../../index";
import notImage from "../../images/not-found-img.jpeg";
import { IInformationOfBook } from "../../models/IInformationOfBook";
import { updateBookBeforeSave } from "../../helpers/updateBookBeforeSave";
import booksService from "../../services/booksFromBD/BooksService";
import s from "./BookView.module.css";
import { IBookFromLibrary } from "../../models/IBookFromLibrary";

const BookView: React.FC = () => {
  const { bookId } = useParams<string>();
  const [book, setBook] = useState<IInformationOfBook | null>(null);
  const [library, setLibrary] = useState<IBookFromLibrary[]>([]);
  let navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    if (bookId) {
      getBookAPI.getBookInfoById(bookId).then(setBook);
    }
  }, [bookId]);

  useEffect(() => {
    booksService.fetchBooks().then((res) => setLibrary(res.data));
  }, []);

  const onGoBack = () => {
    navigate(-1);
  };

  const handleAddBookToLibrary = (addedBook: IInformationOfBook) => {
    const newBook = updateBookBeforeSave(addedBook);
    booksService.addBook(newBook, store.user.id).then((res) => {
      if (res.status === 200) {
        toast.success("Success! Book added.");
        booksService.fetchBooks().then((res) => setLibrary(res.data));
      }
    });
  };

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
      {book && (
        <>
          <div className={s.backBtnWrap}>
            <Button onClick={onGoBack} text="Go back" />
            {store.isAuth && !library.find((el) => el.id === bookId) && (
              <Button
                onClick={() => handleAddBookToLibrary(book)}
                text="Add to library"
              />
            )}
            {store.isAuth && library.find((el) => el.id === bookId) && (
              <Button
                onClick={() => handleDeleteBookFromLibrary(book.id)}
                text="Delete from library"
              />
            )}
          </div>
          <h2>
            {book.volumeInfo.title} ({book.volumeInfo.publishedDate.slice(0, 4)}
            )
          </h2>
          <div className={s.bookWrap}>
            <div className={s.imageWrap}>
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail
                    ? book.volumeInfo.imageLinks.thumbnail
                    : notImage
                }
                alt={book.volumeInfo.title}
                className={s.filmCardPoster}
                width="264"
                height="390"
              />
            </div>

            <ul className={s.description}>
              <li className={s.descriptionItem}>
                <h3 className={s.descriptionTitle}>Description :</h3>
                <p className={s.overview}>
                  {book.volumeInfo.description
                    ? book.volumeInfo.description
                    : "No description for this book"}
                </p>
              </li>
              <li className={s.descriptionItem}>
                <h3>Publisher :</h3>
                <p className={s.overview}>{book.volumeInfo.publisher}</p>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default observer(BookView);
