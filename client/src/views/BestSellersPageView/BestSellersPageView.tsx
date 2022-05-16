import { useState, useEffect } from "react";

import { findPopularBooks } from "../../helpers/findPopularBooks";
import { IPopularBooks } from "../../models/IPopularBook";

import s from "./BestSellersPageView.module.css";

const HomePageView: React.FC = () => {
  const [popularBooks, setPopularBooks] = useState<IPopularBooks[]>([]);

  useEffect(() => {
    findPopularBooks().then((response) => setPopularBooks(response));
  }, []);

  return (
    <div className={s.bookCards}>
      <h1>The New York Times Best Sellers lists</h1>
      <ul className={s.bookCardsList}>
        {popularBooks.map(
          ({
            primary_isbn10,
            author,
            title,
            book_image,
            amazon_product_url,
          }) => (
            <li key={primary_isbn10} className={s.bookCardWrap}>
              <a href={amazon_product_url} className={s.bookCardLink}>
                <img
                  src={book_image}
                  alt="Book's poster"
                  className={s.bookCardPoster}
                />
                <h2 className={s.bookCardTitle}>
                  {title.length > 27 ? `${title.slice(0, 25)}...` : title}
                </h2>
                <p className={s.bookCardAuthor}>{author}</p>
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default HomePageView;