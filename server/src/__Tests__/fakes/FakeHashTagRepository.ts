import HashTag from '../../entities/HashTag';
import IHashTagRepository from '../../Repositories/IHashTagRepository';

class FakeHashTagRepository implements IHashTagRepository {
  private hashTags: HashTag[] = [];

  public async findByDescription(
    description: string,
    userId: number,
  ): Promise<HashTag | undefined> {
    const user = this.hashTags.find(
      item => item.description === description && item.userId === userId,
    );
    return user;
  }

  public async save(description: string, userId: number): Promise<HashTag> {
    const hashTag = new HashTag();

    Object.assign(hashTag, {
      id: this.getNextId(),
      description,
      userId,
    });

    this.hashTags.push(hashTag);

    return hashTag;
  }

  private getNextId(): number {
    if (this.hashTags.length === 0) return 1;
    return this.hashTags[this.hashTags.length - 1].id + 1;
  }
}

export default FakeHashTagRepository;
