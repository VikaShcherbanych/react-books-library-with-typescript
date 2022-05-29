import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from './hooks/redux';

import Container from './components/Container/Container';
import NavBar from './components/NavBar/NavBar';
import LoginView from './views/LoginView/LoginView';
import PendingView from './views/PendingView/PendingView';
import SignUpView from './views/SignUpView/SignUpView';

const BestSellersPageView = lazy(
  () =>
    import(
      './views/BestSellersPageView/BestSellersPageView' /* webpackChunkName: "home-page" */
    ),
);
const SearchBooksView = lazy(
  () =>
    import(
      './views/SearchBooksView/SearchBooksView' /* webpackChunkName: "books-page" */
    ),
);
const BookView = lazy(
  () =>
    import(
      './views/BookView/BookView' /* webpackChunkName: "books-details-page" */
    ),
);

const LibraryView = lazy(
  () =>
    import(
      './views/LibraryView/LibraryView' /* webpackChunkName: "library-page" */
    ),
);

const App: React.FC = () => {
  const store = useAppSelector(state => state.auth);

  return (
    <>
      <NavBar />
      <Container>
        {!store.user.isActivated && store.isAuth ? (
          <h1>Confirm your email address</h1>
        ) : (
          <Suspense fallback={<PendingView />}>
            {!store.isAuth ? (
              <Routes>
                <Route path="/" element={<BestSellersPageView />} />
                <Route path="/books" element={<SearchBooksView />} />
                <Route path="/books/:bookId" element={<BookView />} />
                <Route path="/registration" element={<SignUpView />} />
                <Route path="/login" element={<LoginView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<BestSellersPageView />} />
                <Route path="/books" element={<SearchBooksView />} />
                <Route path="/books/:bookId" element={<BookView />} />
                <Route path="/library" element={<LibraryView />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            )}
          </Suspense>
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Container>
    </>
  );
};

export default App;
