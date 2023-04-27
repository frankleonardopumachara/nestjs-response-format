import {BadRequestException, Controller, Get, HttpException, HttpStatus} from '@nestjs/common';
import {AppService} from './app.service';
import {DuplicateEmailError} from "./domain/errors";
import {fromError, fromMessage} from "./exceptions/my-http.exception";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {
    }

    @Get()
    getHello(): string {
        // throw Error()
        throw fromError(new DuplicateEmailError(), HttpStatus.BAD_REQUEST)
        throw fromMessage("error", HttpStatus.CONFLICT)
        throw new BadRequestException(new DuplicateEmailError())
        throw new HttpException(new DuplicateEmailError(), HttpStatus.BAD_REQUEST)
        throw new BadRequestException("correo duplicado 1", {
            cause: new DuplicateEmailError(),
        })
        throw new HttpException("correo duplicado 1", HttpStatus.BAD_REQUEST, {
            cause: new DuplicateEmailError(),
        })
        throw new Error("ohh no!")
        return this.appService.getHello();
    }
}
