const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const PORT = process.env.PORT || 3000;

const app = new Koa();
app.use(bodyParser());

const router = require('../routers');
app.use(router.routes());

app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});

