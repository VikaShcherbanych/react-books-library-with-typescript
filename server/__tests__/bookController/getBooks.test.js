const getBooks = require("../../controlles/book-controller").getBooks;
const bookService = require("../../service/book-service");

const res = [{
    "_id": "6295266db1428d89c6006f7b",
    "title": "One-Eyed Cat",
    "authors": [
        "Paula Fox"
    ],
    "categories": [
        "Young Adult Fiction / Historical / United States / 20th Century",
        "Young Adult Fiction / Animals / General",
        "Young Adult Fiction / Social Themes / Values & Virtues"
    ],
    "imageLink": "http://books.google.com/books/publisher/content?id=h8AsDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71r_fjBi4MkJHn0R4cmSVWjDQNmMeJRE1v8xauRyANL5LMXlC98OC__BxrhPcA668jEDHnpnwqZD-Mi3HrKlZLx8yryvb-2hP3DoI12mLk8LUrKwigWtQBfiXrYgRs99kzH8is3&source=gbs_api",
    "previewLink": "http://books.google.com.ua/books?id=h8AsDAAAQBAJ&hl=&source=gbs_api",
    "id": "h8AsDAAAQBAJ",
    "owner": "62838f84e4e2fac20845a5a7",
    "__v": 0
},
{
    "_id": "629526b6b1428d89c6006f8a",
    "title": "Guide for Mapping of Electric Systems for REA Borrowers",
    "authors": [],
    "categories": [],
    "imageLink": "http://books.google.com/books/content?id=xKt77RWWJRMC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70RkRHx35Y9LF6exFukKySmNR1UWGGleihmMETk1TEsO3BvYk2IyGWce0UQK-J8pHDIRAGI52i-95FM432EAi0NbgNMhvqjWP_GYLKrzB2u7PLfab8yD0S-xWeY3qgz_WTIqc_z&source=gbs_api",
    "previewLink": "http://books.google.com.ua/books?id=xKt77RWWJRMC&hl=&source=gbs_api",
    "id": "xKt77RWWJRMC",
    "owner": "62838f84e4e2fac20845a5a7",
    "__v": 0
},
{
    "_id": "6295272eb1428d89c6006fa7",
    "title": "Full-Stack React, TypeScript, and Node",
    "authors": [
        "David Choi"
    ],
    "categories": [
        "Computers / Distributed Systems / General",
        "Computers / Internet / Web Browsers",
        "Computers / Internet / Web Services & APIs"
    ],
    "imageLink": "http://books.google.com/books/publisher/content?id=uUMQEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73XpM53sN9y7KbhjteNqTmstOitYCLWWG7SDStqU-vICA084CBD8vvocMdmthHKE_NkUELHyNKFBdt4xAnvecXZg5I66aBmdWIB-iS2cGtLejcLm2iWk4F2JmfgpESbfp3japzv&source=gbs_api",
    "previewLink": "http://books.google.com.ua/books?id=uUMQEAAAQBAJ&hl=&source=gbs_api",
    "id": "uUMQEAAAQBAJ",
    "owner": "62838f84e4e2fac20845a5a7",
    "__v": 0
}];

const req = {
    user: {
        email: "dyaral696@gmail.com",
        id: "62838f84e4e2fac20845a5a7",
        isActivated: true,
      }
};

const next = jest.fn();
jest.spyOn(bookService, "getBooks").mockImplementation(() => res);

describe("Book controller, method getBooks", () => {

  afterEach(() => {jest.clearAllMocks()});
  test("should not get arguments req and called next as a result", async () => {
    await getBooks({}, res, next);
    expect(next).toBeCalled();
  });
  test("should get argument req with user property", async () => {
    await getBooks(req, res, next);
    expect(req).toHaveProperty("user");
  });
  test("should get argument req and return res", async () => {
    let result;
    bookService.getBooks.mockReturnValue(res);
    await getBooks(req, res, next).then(() => {
      result = res;
    });
    expect(bookService.getBooks).toBeCalledTimes(1);
    expect(result).toBeDefined();
    expect(result).toEqual(res);
  });
});
