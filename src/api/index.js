const Router = require('koa-router');
const survey = require('./survey');
const api = new Router();

// api.get('test', (ctx) => {
//     ctx.body = 'test';
// });
api.use('/survey', survey.routes());

module.exports = api;
