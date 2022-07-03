import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import { toast } from "react-toastify";
import  LibraryItem  from "../components/LibraryItem/LibraryItem";

configure({adapter: new Adapter()});

jest.mock("../images/not-found-img.jpeg", () => ({}));
jest.mock("../components/LibraryItem/LibraryItem.module.css", () => ({}));
jest.mock('../components/Button/Button.tsx', () => ({}));
toast.success = jest.fn();

jest.mock('../hooks/redux', () => ({
  useAppDispatch: () => {},
  useAppSelector: () => ({
    library: {}
  }),
}));

const expectedBook = {
      id: 'gwCrDwAAQBAJ',
      title: "A Cat's Tale",
      authors: ['Dr. Paul Koudounaris', 'Baba the Cat'],
      categories: ['Fantasy', 'Cat'],
      imageLink: 'http://books.google.com/books/content?id=gwCrDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
      previewLink: 'http://books.google.com/books?id=gwCrDwAAQBAJ&printsec=frontcover&dq=cats&hl=&cd=1&source=gbs_api',
};

describe("BookItem", () => {
    test("should show BookItem", () => {
        const sut = shallow(<LibraryItem book={expectedBook}/>);
        expect(sut).toMatchSnapshot();
    });
});