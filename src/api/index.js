const Router = require('koa-router');
const survey = require('./survey');
const admin = require('./admin');
const auth = require('./auth');
const api = new Router();

api.use('/admin', admin.routes());
api.use('/survey', survey.routes());
api.use('/auth', auth.routes());

module.exports = api;
