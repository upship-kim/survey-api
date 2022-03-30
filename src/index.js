require('dotenv').config();
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');

const api = require('./api');

const app = new Koa();
const router = new Router();

// eslint-disable-next-line no-undef
const { PORT, MONGO_URI } = process.env;

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => console.log(e));

router.use('/api', api.routes());

app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
