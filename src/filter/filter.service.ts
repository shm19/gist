import { Injectable } from '@nestjs/common';
import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class FilterService implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus?.() || 500;

    const errorResponse = {
      status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: exception.message || null,
    };

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(errorResponse),
    );
    response.status(status).json(errorResponse);
  }
}
