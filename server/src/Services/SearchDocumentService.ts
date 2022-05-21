import { inject, injectable } from 'tsyringe';
import IDocumentRepository, {
  SearchResultDto,
} from '../Repositories/IDocumentRepository';

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
    return this.documentRepository.search(keyWord, userId);
  }
}

export default SearchDocumentService;
