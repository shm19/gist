import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { FilterService } from './filter.service';

@Module({
  providers: [FilterService, LoggerService],
  exports: [FilterService],
  imports: [LoggerModule],
})
export class FilterModule {}
