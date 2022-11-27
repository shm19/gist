import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './users/user.module';
import { ReposModule } from './repos/repo.module';
import { LoggerModule } from './logger/logger.module';
import { FilterModule } from './filter/filter.module';
import { FileModule } from './files/file.module';
import { ReviewModule } from './review/review.module';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
    MikroOrmModule.forRoot(),
    UserModule,
    ReposModule,
    LoggerModule,
    FilterModule,
    FileModule,
    ReviewModule,
    TagModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
