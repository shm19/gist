import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './file.entity';
import { UserModule } from '../users/user.module';

@Module({
  imports: [MikroOrmModule.forFeature([File]), FileModule, UserModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
