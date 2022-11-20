import { Module } from '@nestjs/common';
import { UserModule } from 'src/users/user.module';
import { RepoController } from './repo.controller';
import { RepoService } from './repo.service';

@Module({
  imports: [UserModule],
  controllers: [RepoController],
  providers: [RepoService],
})
export class ReposModule {}
