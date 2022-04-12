const jwt = require('jsonwebtoken');
const jwtMiddleware = (ctx, next) => {
    const token = ctx.cookies.get('accessToken');
    if (!token) return next();
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        ctx.state.user = {
            id: decoded.id,
        };
        console.log(decoded);
        return next();
    } catch (error) {
        return next();
    }
};

module.exports = jwtMiddleware;
