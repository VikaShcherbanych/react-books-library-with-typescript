import { IInformationOfBook } from "../models/IInformationOfBook";

export const updateBookBeforeSave = (book: IInformationOfBook) => {
  const imgNotFound = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.salonlfc.com%2Fen%2Fimage-not-found%2F&psig=AOvVaw2O5Kf--EBinKQNFem6EdEk&ust=1652911004927000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCPiyk8DD5_cCFQAAAAAdAAAAABAD';
  const id = book.id;
  const title = book.volumeInfo.title;
  const authors = book.volumeInfo.authors;
  const categories = book.volumeInfo.categories;
  const imageLink = book.volumeInfo.imageLinks?.thumbnail || imgNotFound;
  const previewLink = book.volumeInfo.previewLink;
  return { id, title, authors, categories, imageLink, previewLink };
};
