import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus} from "@nestjs/common";
import {HttpAdapterHost} from "@nestjs/core";
import {ErrorFormat, ResponseFormat} from "../response-format";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const {httpAdapter} = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const responseBody: ResponseFormat = {
            success: false,
            data: null,
            error: {
                message: "error",
                name: "Duplicate Email",
                code: "DUPLICATE_EMAIL",
                stack: undefined
            }
        }

        let status = HttpStatus.INTERNAL_SERVER_ERROR

        if (exception instanceof HttpException) {
            const exceptionResponseObject = exception.getResponse() as ErrorFormat
            responseBody.error.name = exceptionResponseObject.name
            responseBody.error.message = exceptionResponseObject.message
            responseBody.error.code = exceptionResponseObject.code
            responseBody.error.stack = exceptionResponseObject.stack
            status = exception.getStatus()
        }

        httpAdapter.reply(ctx.getResponse(), responseBody, status);
    }
}