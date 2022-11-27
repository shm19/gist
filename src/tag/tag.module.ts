import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Repo } from 'src/repos/repo.entity';
import { TagController } from './tag.controller';
import { Tag } from './tag.entity';
import { TagService } from './tag.service';

@Module({
  imports: [MikroOrmModule.forFeature([Tag, Repo])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
