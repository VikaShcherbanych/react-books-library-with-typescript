import { toast } from "react-toastify";

import getBooksAPI from "../services/booksFromOpenAPI/getBooks-api";

export const findPopularBooks = () => {
  return getBooksAPI
    .getPopularBooks()
    .then((response) => {
      toast.success("Enjoy this books!");
      return response.results.books;
    })
    .catch((error) => {
      toast.error(`No response from server! ${error.message}`);
    });
};
