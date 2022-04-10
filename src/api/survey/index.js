const Router = require('koa-router');
const surveyCtrl = require('./surveys.ctrl');

const survey = new Router();

survey.post('/', surveyCtrl.write);

module.exports = survey;
