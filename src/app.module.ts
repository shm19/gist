import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './users/user.module';
import { ReposModule } from './repos/repo.module';
@Module({
  imports: [MikroOrmModule.forRoot(), UserModule, ReposModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
