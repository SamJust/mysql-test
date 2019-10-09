const Router = require('koa-router');
const router = new Router();

const booksRouter = require('./booksRouter');

router.use('/books', booksRouter.routes());

module.exports = router;