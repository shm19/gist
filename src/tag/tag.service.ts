import { Injectable, NotFoundException } from '@nestjs/common';
import { RepoRepository } from 'src/repos/repo.repository';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagRepository } from './tag.repository';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    private readonly repoRepository: RepoRepository,
  ) {}

  async addTagToRepo(tag: CreateTagDto, repoId: number) {
    const newTag = this.tagRepository.create(tag);
    const repo = await this.repoRepository.findOne(repoId);
    if (!repo) throw new NotFoundException('Repo not found');
    repo.tags.add(newTag);
    return this.tagRepository.persistAndFlush(newTag);
  }

  getAllTags(name: string) {
    return this.tagRepository.find({
      name: {
        $like: `%${name || ''}%`,
      },
    });
  }

  }
}
