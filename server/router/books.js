const Router = require('express').Router;
const bookController = require('../controlles/book-controller');
const router = new Router();
const authMiddleware = require('../middlewares/auth-middleware');

router.get('/', authMiddleware, bookController.getBooks);
router.post('/',  authMiddleware, bookController.addBook);
router.delete('/:bookId',  authMiddleware, bookController.deleteBook);

module.exports = router;