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

  async upload(file: Express.Multer.File, id: number) {
    const dirPath = `${__dirname}/../../uploads/${id}`;

    const repo = await await this.repoRepository.findOneOrFail(id, {
      populate: ['files'],
    });

    const newFileNumber = repo.files.length + 1;
    const [fileName, extension] = file.originalname.split('.');
    const filePath = `${dirPath}/${newFileNumber}.${extension}`;

    const newFile = new File(fileName, extension, newFileNumber, repo);

    await stat(dirPath).catch(
      async () => await mkdir(dirPath, { recursive: true }),
    );
    writeFile(filePath, file.buffer);
    return this.fileRepository.persistAndFlush(newFile);
  }

  favorite(id: number, user: User) {
    const repo = this.repoRepository.getReference(id);
    user.favorites.add(repo);
    return this.repoRepository.flush();
  }

  async unfavorite(id: number, user: User) {
    const repo = this.repoRepository.getReference(id);
    await user.favorites.init();
    user.favorites.remove(repo);
    return this.repoRepository.flush();
  }

  async getFavorites(user: User) {
    const result = await user.favorites.init();
    return result.toArray();
  }
}
