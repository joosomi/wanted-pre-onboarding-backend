class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode =
        err.statusCode || res.statusCode !== 200 ? res.statusCode : 500;
    res.status(statusCode);
    res.json({
        message: err.message,
        // 개발 환경에서만 stack trace 출력하도록 설정
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler, NotFoundError };
