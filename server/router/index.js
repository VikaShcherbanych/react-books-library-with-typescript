const Router = require('express').Router;
const userController = require('../controlles/user-controller');
const BookController = require('../controlles/book-controller');
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');

router.post('/registration', 
    body('email').isEmail(),
    body('password').isLength({min: 6, max: 32}),
    userController.registration
);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/books', authMiddleware, BookController.getBooks)
router.post('/',  authMiddleware, BookController.addBook);
router.delete('/:bookId',  authMiddleware, BookController.deleteBook);

module.exports = router;