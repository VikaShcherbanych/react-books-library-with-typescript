import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import booksImage from '../../images/books-1.jpeg';
import PendingView from '../PendingView/PendingView';
import { getBooks } from '../../redux/reducers/library/BookActionCreators';
import LibraryList from '../../components/LibraryList/LibraryList';

const LibraryView: React.FC = () => {
  const dispatch = useAppDispatch();
  const store = useAppSelector(state => state);
  let library = store.library.books

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  return (
    <>
      {store.library.isLoading && <PendingView />}
      {library.length > 0 ? (
        <LibraryList books={library} />
      ) : (
        <>
          <h1>Your Library is empty!</h1>
          <img src={booksImage} width="340" alt="booksr" />
        </>
      )}
    </>
  );
};

export default LibraryView;
