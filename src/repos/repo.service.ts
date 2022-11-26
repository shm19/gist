import { wrap } from '@mikro-orm/core';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { writeFile, stat, mkdir } from 'fs/promises';
import { validate } from 'class-validator';
import { User } from '../users/user.entity';
import { CreateRepoDto } from './dtos/create-repo.dto';
import { UpdateRepoDto } from './dtos/update-repo.dto';
import { Repo } from './repo.entity';
import { RepoRepository } from './repo.repository';
import { FileRepository } from 'src/files/file.repository';
import { File } from 'src/files/file.entity';

@Injectable()
export class RepoService {
  constructor(
    private readonly repoRepository: RepoRepository,
    private readonly fileRepository: FileRepository,
  ) {}

  async findAll() {
    const repos = await this.repoRepository.findAll({
      populate: ['files'],
    });
    return repos.map((repo) => {
      return { ...repo, files: repo.files.toArray() };
    });
  }

  async findOne(id: number) {
    const repo = await this.repoRepository
      .findOneOrFail(id, {
        populate: ['files'],
      })
      .catch(() => {
      throw new NotFoundException({
        message: 'Repo not found',
      });
    });
    return { ...repo, files: repo.files.toArray() };
  }

  async create(repo: CreateRepoDto, user: User) {
    const newRepo = new Repo(repo.name, repo.content);
    const errors = await validate(newRepo);
    if (errors.length > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    newRepo.user = user;
    this.repoRepository.persistAndFlush(newRepo);
    return newRepo;
  }

  async update(id: number, repo: UpdateRepoDto) {
    const foundRepo = await this.findOne(id);
    if (!foundRepo) {
      throw new HttpException(
        {
          message: 'Repo not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    // update user
    wrap(foundRepo).assign(repo);

    await this.repoRepository.flush();

    return foundRepo;
  }

  delete(id: number) {
    const repoRef = this.repoRepository.getReference(id);
    return this.repoRepository.removeAndFlush(repoRef);
  }

  async upload(file: any, id: number, line: number) {
    const dirPath = `${__dirname}/../../uploads`;
    const filePath = `${dirPath}/${id}-${line}`;
    await stat(dirPath).catch(async () => await mkdir(dirPath));
    writeFile(filePath, file.buffer);
  }
}
