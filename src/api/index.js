const Router = require('koa-router');
const survey = require('./survey');
const admin = require('./admin');
const api = new Router();

api.use('/admin', admin.routes());
api.use('/survey', survey.routes());

module.exports = api;
