import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { writeFile, stat, mkdir } from 'fs/promises';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { serialize } from 'src/interceptors/serialze.interceptor';
import { AdminGuard } from '../guards/admin-guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateRepoDto } from './dtos/create-repo.dto';
import { ResponseRepoDto } from './dtos/response-repo.dto';
import { UpdateRepoDto } from './dtos/update-repo.dto';
import { RepoService } from './repo.service';

@UseInterceptors(serialize(ResponseRepoDto))
@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('repos')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload')
  async upload(@UploadedFile() file: Express.Multer.File) {
    await stat(`${__dirname}/../../uploads`).catch(
      async () => await mkdir(`${__dirname}/../../uploads`),
    );
    writeFile(`${__dirname}/../../uploads/${file.originalname}`, file.buffer);
  }

  @Get()
  findAll() {
    return this.repoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repoService.findOne(Number.parseInt(id));
  }

  @Post()
  create(@Body() repo: CreateRepoDto, @CurrentUser() user) {
    return this.repoService.create(repo, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() repo: UpdateRepoDto) {
    return this.repoService.update(Number.parseInt(id), repo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repoService.delete(Number.parseInt(id));
  }
}
