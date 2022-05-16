import { toast } from "react-toastify";
import getBookAPI from "../services/getBooks-api";
import { IBook } from "../models/IBook";

export const findBooks = (request: string, page: number, books: IBook[]) => {
    const requestParams = { request, page };
    return getBookAPI
      .getBookByRequest(requestParams)
      .then((response) => {
        if (response.totalItems > 0 && page === 1) {
          toast.info("Your books found. Have a nice reading!");
        }
        if (response.totalItems === 0) {
            toast.error(
              "Any books has been found. Please enter your request again!"
            );
        }
        return response;
      })
};