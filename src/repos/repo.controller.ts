import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/guards/admin-guard';
import { CreateRepoDto } from './dtos/create-repo.dto';
import { UpdateRepoDto } from './dtos/update-repo.dto';
import { RepoService } from './repo.service';

@UseGuards(AuthGuard('jwt'), AdminGuard)
@Controller('repos')
export class RepoController {
  constructor(private readonly repoService: RepoService) {}

  @Get()
  findAll() {
    return this.repoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repoService.findOne(Number.parseInt(id));
  }

  @Post()
  create(@Body() repo: CreateRepoDto) {
    return this.repoService.create(repo);
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
