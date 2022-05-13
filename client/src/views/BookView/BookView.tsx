import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  useParams } from 'react-router-dom';
import getBookAPI from '../../services/getBooks-api';
import notImage from '../../images/not-found-img.jpeg';

import s from './BookView.module.css';

interface IBooks {
    id: string,
    volumeInfo: {
        title: string,
        description: string,
        pageCount: number,
        publishedDate: string,
        publisher: string,
        authors: Array<string>,
        imageLinks: {
            thumbnail:string
        }
    } 
}

const BookView: React.FC = () => {
  const { bookId } = useParams<string>();
  const [book, setBook] = useState<IBooks | null>(null);
  let navigate = useNavigate();

  useEffect(() => {
    if(bookId) {
    getBookAPI.getBookInfoById(bookId).then(setBook);
    }
  }, [bookId]);
  
  const onGoBack = () => {
    navigate(-1)
  }
 
  return (
      <>
      {book && (
        <>
        <div className={s.backBtnWrap}>
        <button type="button" onClick={onGoBack} className={s.backBtn}>
              Go back
        </button>
        </div>
        <h2>
            {book.volumeInfo.title} ({book.volumeInfo.publishedDate.slice(0, 4)})
          </h2>
        <div className={s.bookWrap}>
        <div className={s.imageWrap}>
        <img 
            src={book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : notImage} 
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
                  {book.volumeInfo.description ? book.volumeInfo.description : 'No description for this book'}</p>
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

export default BookView;
