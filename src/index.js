require('dotenv').config();
const Koa = require('koa');
const cors = require('@koa/cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const mongoose = require('mongoose');

const api = require('./api');

const app = new Koa();
const router = new Router();
const jwtMiddleware = require('./lib/jwtMiddleware');
// eslint-disable-next-line no-undef
const { PORT, MONGO_URI } = process.env;

// CORS 옵션
let corsOptions = {
    origin: process.env.CLIENT_HOST,
    credentials: true,
};

// CORS 허용
app.proxy = true; // true 일때 proxy 헤더들을 신뢰함
app.use(cors());

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((e) => console.log(e));
router.use('/api', api.routes());

app.use(bodyParser());
app.use(jwtMiddleware);

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
});
