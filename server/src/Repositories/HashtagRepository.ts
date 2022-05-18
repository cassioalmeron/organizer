/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { getRepository, Repository } from 'typeorm';
import HashTag from '../entities/HashTag';

class HashtagRepository {
  constructor() {
    this.repository = getRepository(HashTag);
  }

  private repository: Repository<HashTag>;

  async getHashTags(hashTags: string[], userId: number): Promise<HashTag[]> {
    const result: HashTag[] = [];

    for (const i in hashTags) {
      const hashTag = await this.getHashTagSaveIfNotExists(hashTags[i], userId);
      result.push(hashTag);
    }

    return result;
  }

  async getHashTagSaveIfNotExists(
    description: string,
    userId: number,
  ): Promise<HashTag> {
    let hashtag = await this.repository.findOne({ description, userId });
    if (!hashtag) {
      hashtag = this.repository.create({ description, userId });
      hashtag = await this.repository.save(hashtag);
    }

    return hashtag;
  }
}

export default HashtagRepository;
