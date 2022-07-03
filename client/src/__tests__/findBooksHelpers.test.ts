import { IBook } from "../models/IBook";
import getBookAPI from "../services/booksFromOpenAPI/getBooks-api";
import  { findBooks } from '../helpers/findBooks';
import { toast } from "react-toastify";

const expectedBooks: Array<IBook>= [{
    id: 'gwCrDwAAQBAJ',
    volumeInfo: {
      title: "A Cat's Tale",
      authors: ['Dr. Paul Koudounaris', 'Baba the Cat'],
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=gwCrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
  },
  {
    id: 'CenFS7OVkMgC',
    volumeInfo: {
      title: 'Cat Toys',
      authors: ['Lura Rogers'],
      imageLinks: {
        thumbnail:
          'http://books.google.com/books/content?id=CenFS7OVkMgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      },
    },
  },
];
toast.error = jest.fn();
toast.info = jest.fn();

type Books = IBook[] | [];

const books: Books = [];

describe('findBooks', () => {
  test('should return books', async () => {
    jest.spyOn(getBookAPI, "getBookByRequest").mockImplementation(() =>  Promise.resolve({ totalItems: 2, items: expectedBooks }));
    const result = await findBooks('test', 1, books);
    expect(result.items).toEqual(expectedBooks);
    expect(toast.info).toHaveBeenCalled();
  });
  test('should return empty array', async () => {
    jest.spyOn(getBookAPI, "getBookByRequest").mockImplementation(() =>  Promise.resolve({ totalItems: 0, items: [] }));
    const result = await findBooks('', 1, books);
    expect(result.items).toEqual([]);
    expect(result.totalItems).toEqual(0);
    expect(toast.error).toHaveBeenCalled();
  });
  test('should do not call toast function', async () => {
    jest.spyOn(getBookAPI, "getBookByRequest").mockImplementation(() =>  Promise.resolve({ totalItems: 2, items: expectedBooks }));
    await findBooks('test', 2, books);
    expect(toast.info).not.toHaveBeenCalled();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
});
