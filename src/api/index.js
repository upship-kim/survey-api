const Router = require('koa-router');
// const survey = require('./survey');
const admin = require('./admin');
const api = new Router();

// api.get('test', (ctx) => {
//     ctx.body = 'test';
// });
// api.use('/survey', survey.routes());
api.use('/admin', admin.routes());

module.exports = api;
