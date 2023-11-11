
const developmentErrorResponse = (error, res) => {
    return res.status(error.statusCode ?? 500).json({
        status: error.status,
        error: error.message,
        errorObj: error,
    })
}

const productionErrorResponse = (error, res) => {
    return res.status(error.statusCode ?? 500).json({
        status: error.status,
        error: error.message,
    })
}

exports.globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'server error';
    if (process.env.NODE_ENV.trim() === 'development') {
        developmentErrorResponse(error, res)
    } else if (process.env.NODE_ENV.trim() === 'production') {
        productionErrorResponse(error, res);
    }
}