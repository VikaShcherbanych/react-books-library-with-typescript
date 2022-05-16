import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import Button from "../../components/Button/Button";
import getBookAPI from "../../services/getBooks-api";
import { Context } from "../../index";
import notImage from "../../images/not-found-img.jpeg";
import { IInformationOfBook } from "../../models/IInformationOfBook";
import s from "./BookView.module.css";

const BookView: React.FC = () => {
  const { bookId } = useParams<string>();
  const [book, setBook] = useState<IInformationOfBook | null>(null);
  let navigate = useNavigate();
  const { store } = useContext(Context);

  useEffect(() => {
    if (bookId) {
      getBookAPI.getBookInfoById(bookId).then(setBook);
    }
  }, [bookId]);

  const onGoBack = () => {
    navigate(-1);
  };

  const onAddBookToLibrary = () => {
    console.log("Added to library");
  };

  return (
    <>
      {book && (
        <>
          <div className={s.backBtnWrap}>
            <Button onClick={onGoBack} text="Go back" />
            {store.isAuth && (
              <Button onClick={onAddBookToLibrary} text="Add to my library" />
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
