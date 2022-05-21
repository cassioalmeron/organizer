import { inject, injectable } from 'tsyringe';
import Document from '../entities/Document';
import IDocumentRepository from '../Repositories/IDocumentRepository';

export type FindToEditResultDto = {
  id: number;
  title: string;
  description?: string;
  files: {
    id: number;
    url: string;
  }[];
  hashTags: string[];
};

@injectable()
class ShowDocumentService {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,
  ) {}

  public async execute(
    id: number,
    userId: number,
  ): Promise<FindToEditResultDto | undefined> {
    const document = await this.documentRepository.findById(Number(id), userId);

    if (!document) return undefined;

    return convert(document);
  }
}

export default ShowDocumentService;

function convert(document: Document): FindToEditResultDto {
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
