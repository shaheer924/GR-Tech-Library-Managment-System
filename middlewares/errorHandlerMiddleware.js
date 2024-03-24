const ErrorHandlerMiddleware = (err, req, res, next) => {
    let {message, statusCode} = err

    // responsing error
    res.status(statusCode).json({
        message,
        success: false,
        stack: err.stack
    })
}

export default ErrorHandlerMiddleware