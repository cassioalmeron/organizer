import { inject, injectable } from 'tsyringe';
import Document from '../entities/Document';
import IDocumentRepository from '../Repositories/IDocumentRepository';

export type SearchResultDto = {
  id: number;
  description?: string;
  files: string[];
  hashTags: string[];
};

@injectable()
class SearchDocumentService {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,
  ) {}

  public async execute(
    keyWord: string,
    userId: number,
  ): Promise<SearchResultDto[]> {
    const result = await this.documentRepository.search(keyWord, userId);
    return result.map(convert);
  }
}

export default SearchDocumentService;

function convert(document: Document): SearchResultDto {
  const result: SearchResultDto = {
    ...document,
    files: document.files.map(file => file.url),
    hashTags: document.hashTags.map(tag => tag.description),
  };
  return result;
}
