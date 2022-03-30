let surveyId = 1;

const surveys = [{ id: 1, title: '제목', body: '내용' }];

/*
    설문 작성 
    POST /api/surveys
    { title, body }
*/

exports.write = (ctx) => {
    const { title, body } = ctx.request.body;
    surveyId += 1;
    const survey = { id: surveyId, title, body };
    surveys.push(survey);
    ctx.body = survey;
};

/*
    설문 목록 조회
    GET /api/surveys
 */

exports.list = (ctx) => {
    ctx.body = surveys;
};

/*
    특정 설문 목록 조회
    GET /api/surveys/:id
 */

exports.read = (ctx) => {
    const { id } = ctx.params;
    const survey = surveys.find((item) => item.id.toString() === id);

    if (!survey) {
        ctx.status = 404;
        ctx.body = {
            message: '설문이 없습니다',
        };
        return;
    }

    ctx.body = survey;
};

/*
    특정 설문 삭제
    DELETE /api/surveys/:id
 */

exports.delete = (ctx) => {
    const { id } = ctx.params;
    const index = surveys.findIndex((item) => item.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '설문이 없습니다',
        };
        return;
    }

    surveys.splice(index, 1);
    ctx.body = {
        message: '삭제 되었습니다.',
    };
};

/*
    특정 설문 수정(교체)
    PUT /api/surveys/:id
 */

exports.replace = (ctx) => {
    const { id } = ctx.params;
    const index = surveys.findIndex((item) => item.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '설문이 없습니다',
        };
        return;
    }

    surveys[index] = {
        id: Number(id),
        ...ctx.request.body,
    };
    ctx.body = surveys[index];
};

/*
    특정 설문 수정(특정 항목 교체)
    PATCH /api/surveys/:id
 */

exports.update = (ctx) => {
    const { id } = ctx.params;
    const index = surveys.findIndex((item) => item.id.toString() === id);
    if (index === -1) {
        ctx.status = 404;
        ctx.body = {
            message: '설문이 없습니다',
        };
        return;
    }

    surveys[index] = {
        ...surveys[index],
        ...ctx.request.body,
    };
    ctx.body = surveys[index];
};
