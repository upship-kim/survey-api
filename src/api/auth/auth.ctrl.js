const Joi = require('joi');
const User = require('../../models/user');

exports.register = async (ctx) => {
    const schema = Joi.object().keys({
        id: Joi.string().alphanum().min(3).max(20).required(),
        password: Joi.string().required(),
        registerKey: Joi.string().required(),
    });
    const result = schema.validate(ctx.request.body);
    if (result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    const { id, password, registerKey } = ctx.request.body;

    try {
        const exists = await User.findById(id);
        if (exists) {
            ctx.status = 409;
            return;
        }
        if (registerKey !== process.env.REGISTER_KEY) {
            ctx.status = 401;
            ctx.body = { message: '등록키를 입력하세요' };
            return;
        }
        const user = new User({
            id,
        });
        await user.setPassword(password);
        await user.save();

        const data = user.toJSON();
        delete data.hashedPassword;
        ctx.body = user.serialize();
    } catch (e) {
        ctx.throw(500, e);
    }
};
exports.login = async (ctx) => {
    const { id, password } = ctx.request.body;
    if (!id || !password) {
        ctx.status = 401;
        return;
    }
    try {
        const user = await User.findById(id);
        if (!user) {
            ctx.status = 401;
            return;
        }
        const valid = await user.checkPassword(password);
        if (!valid) {
            ctx.status = 401;
            return;
        }
        ctx.body = user.serialize();

        const token = user.generateToken();
        ctx.cookies.set('accessToken', token, {
            maxAge: 1000 * 60 * 60 * 24 * 7,
            httpOnly: true,
            sameSite: 'none',
            secure: true,
        });
    } catch (e) {
        ctx.throw(500, e);
    }
};
exports.check = async (ctx) => {
    const { user } = ctx.state;
    if (!user) {
        ctx.status = 401;
        return;
    }

    ctx.body = user;
};
exports.logout = async (ctx) => {
    ctx.cookies.set('accessToken');
    ctx.status = 204;
};
