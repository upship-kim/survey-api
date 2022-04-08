const Template = require('../../models/admin');

/*
    템플릿 작성 
    POST /api/admin
    { title, body }
*/

exports.write = async (ctx) => {
    const { title, rows } = ctx.request.body;
    const documentCount = await Template.find().exec();

    const template = new Template({
        id: documentCount[documentCount.length - 1].id + 1,
        title,
        rows,
    });
    try {
        await template.save();
        ctx.body = {
            success: true,
            message: '추가 되었습니다',
        };
    } catch (e) {
        ctx.body = {
            success: false,
            message: '잠시 후 다시 시도해주세요',
        };
        ctx.throw(500, e);
    }
};

/*
템플릿 조회
GET /api/admin
*/

exports.list = async (ctx) => {
    try {
        const templates = await Template.find().exec();
        console.log(templates);

        ctx.body = {
            success: true,
            data: templates,
        };
    } catch (e) {
        ctx.throw(500, e);
    }
};

/*
    템플릿 삭제
    GET /api/admin/:id
 */

exports.remove = async (ctx) => {
    const { id } = ctx.params;
    console.log(id);
    try {
        await Template.findOneAndRemove({ id: Number(id) }).exec();
        ctx.body = {
            success: true,
            message: '삭제 되었습니다',
        };
    } catch (e) {
        ctx.body = {
            success: false,
            message: '잠시 후 다시 시도해주세요',
        };
        ctx.throw(500, e);
    }
};
exports.update = async (ctx) => {
    const { id } = ctx.params;
    console.log(id);
    try {
        const template = await Template.findOneAndUpdate({ id: Number(id) }, ctx.request.body, { new: true }).exec();
        console.log('template', template);
        if (!template) {
            ctx.body = { success: true, message: '존재하지 않는 템플릿입니다' };
            ctx.status = 404;
            return;
        }
        ctx.body = {
            success: true,
            message: '수정 되었습니다',
        };
    } catch (e) {
        ctx.body = {
            success: false,
            message: '잠시 후 다시 시도해주세요',
        };
        ctx.throw(500, e);
    }
};

/*
    특정 설문 목록 조회
    GET /api/surveys/:id
 */

// exports.read = (ctx) => {
//     const { id } = ctx.params;
//     const survey = surveys.find((item) => item.id.toString() === id);

//     if (!survey) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '설문이 없습니다',
//         };
//         return;
//     }

//     ctx.body = survey;
// };

// /*
//     특정 설문 삭제
//     DELETE /api/surveys/:id
//  */

// /*
//     특정 설문 수정(교체)
//     PUT /api/surveys/:id
//  */

// exports.replace = (ctx) => {
//     const { id } = ctx.params;
//     const index = surveys.findIndex((item) => item.id.toString() === id);
//     if (index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '설문이 없습니다',
//         };
//         return;
//     }

//     surveys[index] = {
//         id: Number(id),
//         ...ctx.request.body,
//     };
//     ctx.body = surveys[index];
// };

// /*
//     특정 설문 수정(특정 항목 교체)
//     PATCH /api/surveys/:id
//  */

// exports.update = (ctx) => {
//     const { id } = ctx.params;
//     const index = surveys.findIndex((item) => item.id.toString() === id);
//     if (index === -1) {
//         ctx.status = 404;
//         ctx.body = {
//             message: '설문이 없습니다',
//         };
//         return;
//     }

//     surveys[index] = {
//         ...surveys[index],
//         ...ctx.request.body,
//     };
//     ctx.body = surveys[index];
// };
