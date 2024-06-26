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
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { serialize } from '../interceptors/serialze.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { CreateRepoDto } from './dtos/create-repo.dto';
import { ResponseRepoDto } from './dtos/response-repo.dto';
import { UpdateRepoDto } from './dtos/update-repo.dto';
import { RepoService } from './repo.service';
import { User } from '../users/user.entity';

@UseInterceptors(serialize(ResponseRepoDto))
@UseGuards(AuthGuard('jwt'))
@Controller('repos')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Post('favorites/:id')
  favorite(@Param('id') id: string, @CurrentUser() user: User) {
    return this.repoService.favorite(Number.parseInt(id), user);
  }

  @Patch('favorites/:id')
  unfavorite(@Param('id') id: string, @CurrentUser() user: User) {
    return this.repoService.unfavorite(Number.parseInt(id), user);
  }

  @Get('favorites')
  getFavorites(@CurrentUser() user: User) {
    return this.repoService.getFavorites(user);
  }

  @Patch('pins/:id')
  unpin(@Param('id') id: string, @CurrentUser() user: User) {
    return this.repoService.togglePin(Number.parseInt(id), user);
  }

  @Get('pins')
  getPins(@CurrentUser() user: User) {
    return this.repoService.getPins(user);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('upload/:id')
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
  ) {
    return this.repoService.upload(file, Number.parseInt(id));
  }

  @Get()
  findAll(@CurrentUser() user: User) {
    return this.repoService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.repoService.findOne(Number.parseInt(id), user);
  }

  @Post()
  create(@Body() repo: CreateRepoDto, @CurrentUser() user) {
    return this.repoService.create(repo, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @CurrentUser() user: User,
    @Body() repo: UpdateRepoDto,
  ) {
    return this.repoService.update(Number.parseInt(id), user, repo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repoService.delete(Number.parseInt(id));
  }
}
