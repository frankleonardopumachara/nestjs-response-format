import {HttpException, HttpStatus} from "@nestjs/common";
import {ErrorFormat} from "../response-format";

export const fromError = (error: Error, status: HttpStatus): HttpException => {
    const errorFormat: ErrorFormat = {
        code: error.name,
        message: error.message,
        name: error.name,
        stack: error.stack
    }
    return new HttpException(errorFormat, status)
}

export const fromMessage = (message: string, status: HttpStatus): HttpException => {
    return new HttpException(message, status)
}