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
