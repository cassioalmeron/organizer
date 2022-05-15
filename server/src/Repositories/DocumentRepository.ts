import { getRepository, Raw, Repository } from 'typeorm';
import Document from '../models/Document';

type SearchResult = {
  id: number;
  description: string;
};

class UserRepository {
  constructor() {
    this.repository = getRepository(Document);
  }

  private repository: Repository<Document>;

  public async findById(
    id: number,
    userId: number,
  ): Promise<Document | undefined> {
    const document = await this.repository.findOne({
      where: { id, userId },
      relations: ['hashTags', 'files'],
    });
    return document;
  }

  public async search(
    keyWord: string,
    userId: number,
  ): Promise<SearchResult[]> {
    const queryResult = await this.repository.find({
      select: ['id', 'title', 'description'],
      // where: { userId },
      where: [
        {
          userId,
          title: Raw(fieldName =>
            keyWord !== undefined
              ? `LOWER(${fieldName}) LIKE '%${keyWord.toLowerCase()}%'`
              : '',
          ),
        },
        {
          userId,
          description: Raw(fieldName =>
            keyWord !== undefined
              ? `LOWER(${fieldName}) LIKE '%${keyWord.toLowerCase()}%'`
              : '',
          ),
        },
      ],
    });

    return queryResult;
  }

  public async save(data: {
    userId: number;
    title: string;
    description: string;
  }): Promise<Document> {
    let document = await this.repository.create(data);
    document = await this.repository.save(document);
    return document;
  }

  public async delete(id: number, userId: number): Promise<void> {
    this.repository.delete({ id, userId });
  }
}

export default UserRepository;
