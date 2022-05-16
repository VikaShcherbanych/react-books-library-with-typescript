export interface IInformationOfBook {
  id: string;
  volumeInfo: {
    title: string;
    description: string;
    pageCount: number;
    publishedDate: string;
    publisher: string;
    authors: Array<string>;
    imageLinks: {
      thumbnail: string;
    };
  };
}
