const Router = require('koa-router');
const adminCtrl = require('./admin.ctrl');
const checkLoggedIn = require('../../lib/checkLoggedIn');
const admin = new Router();

admin.post('/', checkLoggedIn, adminCtrl.write);
admin.get('/', adminCtrl.list);
admin.delete('/:id', checkLoggedIn, adminCtrl.remove);
admin.patch('/:id', checkLoggedIn, adminCtrl.update);

module.exports = admin;
