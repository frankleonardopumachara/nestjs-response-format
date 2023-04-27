import {CallHandler, ExecutionContext, Injectable, NestInterceptor} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {ResponseFormat} from "../response-format";

@Injectable()
export class ResponseFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat> {
        return next.handle().pipe(
            map((data) => ({
                success: true,
                data,
                error: null,
            })),
            // catchError((err) => {
            //     return throwError(() => {
            //         const errorResponse = {
            //             success: false,
            //             data: null,
            //             errors: {
            //                 code: err.code || 'UNKNOWN',
            //                 message: err.message || 'An unknown error occurred',
            //                 stack: err.stack || null,
            //             },
            //         };
            //         return errorResponse;
            //     });
            // }),
        );
    }
}