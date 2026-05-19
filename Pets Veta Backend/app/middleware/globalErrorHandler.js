const globalErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const status = err.status || "error";

    res.status(statusCode).json({
        success: false,
        status: status,
        message: err.message || "Something went wrong"
    })

};

module.exports = globalErrorHandler;