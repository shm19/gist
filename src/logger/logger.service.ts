import { ConsoleLogger, Injectable } from '@nestjs/common';

// create injectable service
@Injectable()
export class LoggerService extends ConsoleLogger {
  log(message: string) {
    super.log(message);
  }
}
