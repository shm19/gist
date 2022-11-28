import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('/repo/:id')
  addTagToRepo(@Body() body: CreateTagDto, @Param('id') id: string) {
    return this.tagService.addTagToRepo(body, Number.parseInt(id));
  }

  @Get()
  getAllTags(@Query('name') name: string) {
    return this.tagService.getAllTags(name);
  }

  @Get('/count')
  countTags(@Query('name') name: string) {
    return this.tagService.countTags(name);
  }
}
