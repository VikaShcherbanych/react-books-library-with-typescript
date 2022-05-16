import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

import s from "./FormForSearchBooks.module.css";

interface IProp {
  onSubmit: (param: string) => void;
}

const FormRorSearchBooks: React.FC<IProp> = ({onSubmit}: IProp) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (event: { currentTarget: HTMLInputElement }) => {
    setQuery(event.currentTarget.value.toLowerCase());
  };

  const reset = () => {
    setQuery("");
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error(
        "Sorry, that search has no results. Please try an alternate search term."
      );
      return;
    }
    onSubmit(query);
    reset();
  };

  return (
    <div>
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
              aria-label="Search images"
            />
          </span>
        </button>
      </form>
    </div>
  );
};
export default FormRorSearchBooks;
