const Koa = require('koa');
const app = new Koa();

app.use((ctx, next) => {
    ctx.body = 'hello world!wsssow ';
    next();
});

app.listen(4000, () => {
    console.log('listening to port 4000');
});
