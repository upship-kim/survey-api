const Router = require('koa-router');
const api = new Router();
const survey = require('./survey');

// api.get('test', (ctx) => {
//     ctx.body = 'test';
// });
api.use('/survey', survey.routes());

module.exports = api;
