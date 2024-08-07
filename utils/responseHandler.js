const sendSuccessResponse = (res, data, message) => {
    res.status(200).json({
        status: 'success',
        message: message,
        data: data,
    });
};

const sendCreatedResponse = (res, data, message) => {
    res.status(201).json({
        status: 'success',
        message: message,
        data: data,
    });
};

const sendNoContentResponse = (res, message) => {
    res.status(204).json({
        status: 'success',
        message: message,
        data: null,
    });
};

module.exports = {
    sendSuccessResponse,
    sendCreatedResponse,
    sendNoContentResponse,
};
