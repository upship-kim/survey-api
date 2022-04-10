const main = require('../../lib/sendMail');

/*
    메일전송
    POST /api/surveys
    { title, body }
*/
exports.write = (ctx) => {
    // console.log(ctx.request.body);
    const { basicInfo, selectedInfo } = ctx.request.body;
    // selectedInfo.map((item) => console.log(item));
    // main(ctx.request.body);
    console.log(basicInfo, selectedInfo);
    ctx.body = ctx.request.body;
};

/*
    설문 목록 조회
    GET /api/surveys
 */
