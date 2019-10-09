const Router = require('koa-router');
const router = new Router();

const {
    get,
    post,
    put
} = require('../controllers/booksController');

router.get('/', get);
router.post('/', post);
router.put('/:id', put);


module.exports = router;