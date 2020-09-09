import { CustomError } from './custom-error'

export class DatabaseConnectionError extends CustomError {
    statusCode = 500
    reason = 'Error Database'

    constructor() {
        super('Error Database')
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
    }

    serializeErrors() {
        return [
            { message: this.reason }
        ]
    }
}