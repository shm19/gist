import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './users/user.module';
import { ReposModule } from './repos/repo.module';
import { LoggerModule } from './logger/logger.module';
import { FilterModule } from './filter/filter.module';
@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    ReposModule,
    LoggerModule,
    FilterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
