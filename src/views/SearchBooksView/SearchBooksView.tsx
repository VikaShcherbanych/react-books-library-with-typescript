import { useState, useEffect } from 'react';
import { NavLink, useSearchParams, useLocation } from 'react-router-dom';
import { toast } from "react-toastify";
import getBookAPI from '../../services/getBooks-api';
import { FaSearch } from 'react-icons/fa';

import notImage from '../../images/not-found-img.jpeg';

import PendingView from '../PendingView/PendingView';
import ErrorView from '../ErrorView/ErrorView';
import Button from '../../components/Button/Button';
import s from './SearchBooksView.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

interface IBooks {
    id: string,
    volumeInfo: {
        title: string,
        authors: Array<string>,
        imageLinks: {
            thumbnail:string
        }
    } 
}

interface IError {
    message: string,
}

const BooksPageView:any = () => {

    const [books, setBooks] = useState<IBooks[]>([]);
    const [query, setQuery] = useState<string>('');
    const [request, setRequest] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [error, setError] = useState<IError | null>(null);
    const [status, setStatus] = useState(Status.IDLE);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    
    const reset = () => {
        setQuery('');
    };
    
    useEffect(() => {
    if (location.search !== '' && request === '') {
        let requestParams = searchParams.get("q") ?? '';
        let pageParams = Number(searchParams.get("page"));
        console.log(requestParams)
        setPage(pageParams)
        setRequest(requestParams)
        findBooks(requestParams, pageParams, books);
        return;
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [location.search]);
    
    const findBooks = (request: string, page: number, books:IBooks[]) => {
       const requestParams = { request, page}
       
       getBookAPI
            .getBookByRequest(requestParams)
            .then(response => {
                if (response.totalItems > 0 && page === 1) {
                    toast.info('Your books found. Have a nice reading!')
                } else
                    if (response.totalItems === 0) {
                        setStatus(Status.IDLE);
                        toast.error('Any films has been found. Please enter your request again!');
                    }
              
                setBooks([...books, ...response.items]);
                setStatus(Status.RESOLVED);
            })
            .catch(error => {
                setError(error);
                setStatus(Status.REJECTED);
            })
    };
    
    const handleChange = (event: { currentTarget: HTMLInputElement }) => {
        setQuery(event.currentTarget.value.toLowerCase());
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();

        if (query.trim() === '') {
            toast.error('Sorry, that search has no results. Please try an alternate search term.');
            return;
        }

        setRequest(query);
        setPage(1);
        setBooks([]);
        reset();
        setStatus(Status.PENDING);
    };
    
    const changePage = () => {
        setPage(p => p + 1);
    };
    
    useEffect(() => {
      if (!request) {
        return;
      };
     
        findBooks(request, page, books);
        setSearchParams(`q=${request}&page=${String(page)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [request, page]);
    
    if (status === 'idle') {
        return (<div>
            <h2>What books are you looking for?</h2>
            <form className={s.searchForm} onSubmit={handleSubmit}>
                <input
                    className={s.searchFormInput}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search books here"
                    value={query}
                    onChange={handleChange}
                />
                <button type="submit" className={s.searchFormButton}>
                    <span> 
                        <FaSearch
                            style={{ marginRight: 8 }}
                            color="rgb(250, 149, 17)"
                            size="30px"
                            aria-label="Search images" />
                    </span>
                </button>
            </form>
        </div>
        );
    }

    if (status === 'pending') {
        return <PendingView />;
    }

    if (status === 'rejected') {
        return <ErrorView message={error?.message} />;
    }

    if (status === 'resolved') {

        return (
            <>
                <form className={s.searchForm} onSubmit={handleSubmit}>
                    <input
                        className={s.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movies here"
                        value={query}
                        onChange={handleChange}
                    />
                    <button type="submit" className={s.searchFormButton}>
                        <span>
                            <FaSearch
                                style={{ marginRight: 8 }}
                                color="rgb(250, 149, 17)"
                                size="30px"
                                aria-label="Search images" />
                        </span>
                    </button>
                </form>
                {books && (
                    <div className={s.bookCards}>
                        <ul className={s.bookCardsList}>
                            {books.map(book => (
                                <li key={book.id} className={s.bookCardWrap}>
                                    <NavLink className={s.bookCardLink}
                                        to={`/books/${book.id}`}
                                    >
                
                                        <img 
                                          src={book.volumeInfo.imageLinks?.thumbnail ? book.volumeInfo.imageLinks.thumbnail : notImage} 
                                          alt={book.volumeInfo.title} 
                                          className={s.filmCardPoster} 
                                          width="264" 
                                          height="390"
                                          />
                                        <h2 className={s.bookCardTitle}>{book.volumeInfo?.title.length > 27 ? `${book.volumeInfo.title.slice(0, 25)}...` : book.volumeInfo.title}</h2>
                                        <p className={s.bookCardAuthor}>
                                            {book.volumeInfo.authors ? book.volumeInfo.authors[0].slice(0, 25) : 'The author is unknown'}
                                        </p>
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        {books.length >= 10 && (
                            <Button onClick={changePage} />
                        )}
                    </div>
                )}
            </>
        )
    }
}

export default BooksPageView;