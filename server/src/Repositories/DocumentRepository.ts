import { getRepository, Raw, Repository } from 'typeorm';
import Document from '../entities/Document';
import IDocumentRepository, { SearchResultDto } from './IDocumentRepository';

class DocumentRepository implements IDocumentRepository {
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
  ): Promise<Document | undefined> {
    return this.repository.findOne({
      where: { id, userId },
      relations: ['hashTags', 'files'],
    });
  }

  public async search(
    keyWord: string,
    userId: number,
  ): Promise<SearchResultDto[]> {
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

  public async delete(id: number, userId: number): Promise<boolean> {
    const deleteResult = await this.repository.delete({ id, userId });
    return deleteResult.affected ? deleteResult.affected > 0 : false;
  }
}

export default DocumentRepository;

function convertToSearchResult(document: Document): SearchResultDto {
  const result: SearchResultDto = {
    ...document,
    files: document.files.map(file => file.url),
    hashTags: document.hashTags.map(tag => tag.description),
  };
  return result;
}
