const Router = require('koa-router');
const surveyCtrl = require('./surveys.ctrl');

const survey = new Router();

//메일전송
survey.post('/', surveyCtrl.write);

module.exports = survey;
