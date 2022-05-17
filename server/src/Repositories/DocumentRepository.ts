import { getRepository, Raw, Repository } from 'typeorm';
import Document from '../models/Document';

type SearchResult = {
  id: number;
  description: string;
  files: string[];
  hashTags: string[];
};

type FindToEditResult = {
  id: number;
  title: string;
  description?: string;
  files: {
    id: number;
    url: string;
  }[];
  hashTags: string[];
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

  public async findToEdit(
    id: number,
    userId: number,
  ): Promise<FindToEditResult | undefined> {
    const document = await this.repository.findOne({
      where: { id, userId },
      relations: ['hashTags', 'files'],
    });

    if (!document) return undefined;

    return {
      id: document.id,
      title: document.title,
      description: document.description,
      files: document.files.map(file => {
        return { id: file.id, url: file.url };
      }),
      hashTags: document.hashTags.map(tag => tag.description),
    };
  }

  public async search(
    keyWord: string,
    userId: number,
  ): Promise<SearchResult[]> {
    const queryResult = await this.repository.find({
      select: ['id', 'title'],
      relations: ['files', 'hashTags'],
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

    return queryResult.map(convertToSearchResult);
  }

  public async save(data: { id?: number }): Promise<Document> {
    if (data.id) {
      let document = await this.repository.create(data);
      document = await this.repository.save(document);
      return document;
    }

    const document = await this.repository.save(data);
    return document;
  }

  public async delete(id: number, userId: number): Promise<void> {
    this.repository.delete({ id, userId });
  }
}

export default UserRepository;

function convertToSearchResult(document: Document): SearchResult {
  console.log(document);

  const result: SearchResult = {
    ...document,
    files: document.files.map(file => file.url),
    hashTags: document.hashTags.map(tag => tag.description),
  };
  return result;
}
