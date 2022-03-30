const Router = require('koa-router');
const surveyCtrl = require('./surveys.ctrl');

const survey = new Router();

survey.get('/', surveyCtrl.list);
survey.post('/', surveyCtrl.write);
survey.get('/:id', surveyCtrl.read);
survey.delete('/:id', surveyCtrl.delete);
survey.put('/:id', surveyCtrl.replace);
survey.patch('/:id', surveyCtrl.update);

module.exports = survey;
