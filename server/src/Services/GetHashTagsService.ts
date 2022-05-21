/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import HashTag from '../entities/HashTag';
import IHashTagRepository from '../Repositories/IHashTagRepository';

@injectable()
class GetHashTagsService {
  constructor(
    @inject('HashtagRepository') private hashtagRepository: IHashTagRepository,
  ) {}

  async execute(hashTags: string[], userId: number): Promise<HashTag[]> {
    const result: HashTag[] = [];

    for (const i in hashTags) {
      const hashTag = await this.getHashTagSaveIfNotExists(hashTags[i], userId);
      result.push(hashTag);
    }

    return result;
  }

  private async getHashTagSaveIfNotExists(
    description: string,
    userId: number,
  ): Promise<HashTag> {
    let hashtag = await this.hashtagRepository.findByDescription(
      description,
      userId,
    );
    if (!hashtag) {
      hashtag = await this.hashtagRepository.save(description, userId);
    }

    return hashtag;
  }
}

export default GetHashTagsService;
