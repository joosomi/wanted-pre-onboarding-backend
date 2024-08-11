export const sendSuccessResponse = (res, data, message) => {
    res.status(200).json({
        status: 'success',
        message,
        data,
    });
};

export const sendCreatedResponse = (res, data, message) => {
    res.status(201).json({
        status: 'success',
        message,
        data,
    });
};

export const sendNoContentResponse = (res, message) => {
    res.status(204).json({
        status: 'success',
        message,
        data: null,
    });
};
