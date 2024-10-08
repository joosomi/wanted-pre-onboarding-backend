class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        this.statusCode = 404;
    }
}

class BadRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BadRequestError';
        this.statusCode = 400;
    }
}

class InternalServerError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InternalServerError';
        this.statusCode = 500;
    }
}

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // 기본값을 500으로 설정
    res.status(statusCode);
    res.json({
        message: err.message,
        // 개발 환경에서만 stack trace 출력하도록 설정
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { errorHandler, NotFoundError, BadRequestError, InternalServerError };
