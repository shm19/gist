import { wrap } from '@mikro-orm/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { CreateRepoDto } from './dtos/create-repo.dto';
import { UpdateRepoDto } from './dtos/update-repo.dto';
import { Repo } from './repo.entity';
import { RepoRepository } from './repo.repository';

@Injectable()
export class RepoService {
  constructor(private readonly repoRepository: RepoRepository) {}

  findAll() {
    return this.repoRepository.findAll();
  }

  findOne(id: number) {
    return this.repoRepository.findOne(id);
  }

  async create(repo: CreateRepoDto) {
    // @checkme: difference betwene create and new
    // const newRepo = this.repoRepository.create(repo);
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
}
