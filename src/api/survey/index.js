const Router = require('koa-router');
const surveyCtrl = require('./surveys.ctrl');

const survey = new Router();
// const { list, read, remove, replace, update, write } = surveyCtrl;

survey.get('/', surveyCtrl.list);
survey.post('/', surveyCtrl.write);

module.exports = survey;
