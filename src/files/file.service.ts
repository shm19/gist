import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  findAll() {
    return this.fileRepository.findAll();
  }

  findOne(id: number) {
    return this.fileRepository.findOne(id);
  }
}
