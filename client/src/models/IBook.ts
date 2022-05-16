export interface IBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: Array<string>;
    imageLinks: {
      thumbnail: string;
    };
  };
}
