import { getRepository, Repository } from 'typeorm';
import HashTag from '../entities/HashTag';
import IHashTagRepository from './IHashTagRepository';

class HashTagRepository implements IHashTagRepository {
  constructor() {
    this.repository = getRepository(HashTag);
  }

  private repository: Repository<HashTag>;

  public async findByDescription(
    description: string,
    userId: number,
  ): Promise<HashTag | undefined> {
    return this.repository.findOne({ description, userId });
  }

  public async save(description: string, userId: number): Promise<HashTag> {
    const hashtag = this.repository.create({ description, userId });
    return this.repository.save(hashtag);
  }
}

export default HashTagRepository;
