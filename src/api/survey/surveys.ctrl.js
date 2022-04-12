const main = require('../../lib/sendMail');

/*
    메일전송
    POST /api/surveys
    { title, body }
*/
exports.write = (ctx) => {
    main(ctx.request.body);

    ctx.body = {
        success: true,
        message: '문의가 성공적으로 이뤄졌습니다',
    };
};
