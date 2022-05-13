import { lazy, Suspense } from 'react';
import { Routes , Route, Navigate  } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Container from './components/Container/Container';
import NavBar from './components/NavBar/NavBar';
import PendingView from './views/PendingView/PendingView';

const BestSellersPageView = lazy(() => import('./views/BestSellersPageView/BestSellersPageView' /* webpackChunkName: "home-page" */));
const SearchBooksView = lazy(() => import('./views/SearchBooksView/SearchBooksView' /* webpackChunkName: "books-page" */));
const BookView = lazy(() => import('./views/BookView/BookView' /* webpackChunkName: "books-details-page" */));

const App: React.FC = () => {
  return (
    <>
    <NavBar />
      <Container>
        
      <Suspense fallback={<PendingView />}>
      <Routes >
        <Route path="/" element={<BestSellersPageView />} />
        <Route path="/books" element={<SearchBooksView />} />
        <Route path="/books/:bookId" element={<BookView />} />
        <Route
        path="*"
        element={<Navigate to="/" replace />}
        />
      </Routes>
      </Suspense>
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
}

export default App;