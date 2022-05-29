import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import PendingView from "../PendingView/PendingView";
import ErrorView from "../ErrorView/ErrorView";
import Button from "../../components/Button/Button";
import { IBook } from "../../models/IBook";
import { findBooks } from "../../helpers/findBooks";
import s from "./SearchBooksView.module.css";
import FormRorSearchBooks from "../../components/FormForSearchBooks/FormRorSearchBooks";
import BookList from "../../components/BookList/BookList";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};
interface IError {
  message: string;
}

const SearchBooksView: any = () => {
  const FIRST_PAGE_IN_PAGINATION = 1;
  const [books, setBooks] = useState<IBook[]>([]);
  const [request, setRequest] = useState<string>("");
  const [page, setPage] = useState<number>(FIRST_PAGE_IN_PAGINATION);
  const [error, setError] = useState<IError | null>(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    if (location.search !== "" && request === "") {
      let requestParams = searchParams.get("q") ?? "";
      let pageParams = Number(searchParams.get("page"));
      setPage(pageParams);
      setRequest(requestParams);

      findBooks(requestParams, pageParams, books)
        .then((data) => {
          if (data.totalItems === 0) {
            setStatus(Status.IDLE);
          }
          setBooks([...books, ...data.items]);
          setStatus(Status.RESOLVED);
        })
        .catch((error) => {
          setError(error);
          setStatus(Status.REJECTED);
        });
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    if (!request) {
      return;
    }
    findBooks(request, page, books)
      .then((data) => {
        if (data.totalItems === 0) {
          setStatus(Status.IDLE);
        }
        setBooks([...books, ...data.items]);
        setStatus(Status.RESOLVED);
      })
      .catch((error) => {
        setError(error);
        setStatus(Status.REJECTED);
      });
    setSearchParams(`q=${request}&page=${String(page)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [request, page]);

  const handleFormSubmit = (bookRequest: string) => {
    setRequest(bookRequest);
    setPage(1);
    setBooks([]);
    setStatus(Status.PENDING);
  };

  const changePage = () => {
    setPage((p) => p + 1);
  };

  if (status === "idle") {
    return <FormRorSearchBooks onSubmit={handleFormSubmit} />;
  }

  if (status === "pending") {
    return <PendingView />;
  }

  if (status === "rejected") {
    return <ErrorView message={error?.message} />;
  }

  if (status === "resolved") {
    return (
      <>
        <FormRorSearchBooks onSubmit={handleFormSubmit} />
        {new Set(books) && (
          <div className={s.bookCards}>
            <BookList books={books} />
            {books.length >= 10 && (
              <Button onClick={changePage} text="Load more" />
            )}
          </div>
        )}
      </>
    );
  }
};

export default SearchBooksView;
