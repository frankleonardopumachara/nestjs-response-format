import {HttpAdapterHost, NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {AllExceptionsFilter} from "./filters/error.filter";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const httpAdapterHost = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost))
    await app.listen(3000);
}

bootstrap();
