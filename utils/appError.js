class AppError extends Error {
    constructor(message, statusCode) {

        // sending message to super Error class
        super(message);

        // handling status code
        this.statusCode = statusCode

        // handling stack of errors
        Error.captureStackTrace(this, this.constructor)
    }
}

export default AppError