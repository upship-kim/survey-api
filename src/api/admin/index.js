const Router = require('koa-router');
const adminCtrl = require('./admin.ctrl');

const admin = new Router();
// const { list, read, remove, replace, update, write } = surveyCtrl;

admin.post('/', adminCtrl.write);
admin.get('/', adminCtrl.list);
admin.delete('/:id', adminCtrl.remove);
admin.patch('/:id', adminCtrl.update);

module.exports = admin;
