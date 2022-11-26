import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { serialize } from 'src/interceptors/serialze.interceptor';
import { ResponseFileDto } from './dtos/response-file.dto';
import { FileService } from './file.service';

@UseGuards(AuthGuard('jwt'))
@UseInterceptors(serialize(ResponseFileDto))
@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(Number.parseInt(id));
  }
}
