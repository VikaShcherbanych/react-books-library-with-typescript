import { useState, useEffect } from 'react';
import { toast } from "react-toastify";

import getBooksAPI from '../../services/getBooks-api';

import s from './BestSellersPageView.module.css';


const HomePageView:React.FC = () => {

  interface IPopularBooks {
        primary_isbn10: string,
        title: string,
        author: string,
        book_image: string,
        amazon_product_url: string, 
  }

  const [popularBooks, setPopularBooks] = useState<IPopularBooks[]>([]);

  const findPopularBooks = () => {
    
    getBooksAPI
      .getPopularBooks()
      .then(response => {
        setPopularBooks(response.results.books);
        toast.success('Enjoy this books!');
      })
      .catch(error => {
        toast.error(`No response from server! ${error.message}`);
      })
  };

  useEffect(() => {
    findPopularBooks();
  }, []);

  return (
      <div className={s.bookCards}>
        <h1>The New York Times Best Sellers lists</h1>
         <ul className={s.bookCardsList}>
        {popularBooks.map(({ 
            primary_isbn10, 
            author, 
            title, 
            book_image, 
            amazon_product_url }) => (
          <li key={primary_isbn10} className={s.bookCardWrap}>
            <a href={amazon_product_url} className={s.bookCardLink}>
              <img src={book_image} alt="Book's poster" className={s.bookCardPoster} />
              <h2 className={s.bookCardTitle}>
                  {title.length > 27 ? `${title.slice(0, 25)}...` : title}</h2>
              <p className={s.bookCardAuthor}>{author}</p>
            </a>
          </li>
        ))}
      </ul>
        </div>
      )
};

export default HomePageView;