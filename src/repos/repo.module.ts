import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { File } from '../files/file.entity';
import { UserModule } from '../users/user.module';
import { RepoController } from './repo.controller';
import { Repo } from './repo.entity';
import { RepoService } from './repo.service';

@Module({
  imports: [UserModule, MikroOrmModule.forFeature([Repo, File])],
  controllers: [RepoController],
  providers: [RepoService],
})
export class ReposModule {}
