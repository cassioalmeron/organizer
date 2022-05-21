import { inject, injectable } from 'tsyringe';
import Document from '../entities/Document';
import HashTag from '../entities/HashTag';
import AppError from '../errors/AppError';
import IDocumentRepository from '../Repositories/IDocumentRepository';
import IHashTagRepository from '../Repositories/IHashTagRepository';
import GetHashTagsService from './GetHashTagsService';

export type DocumentDto = {
  title: string;
  description?: string;
  hashTags: string[];
  files: {
    url: string;
  }[];
};

@injectable()
class CreateDocumentService {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,
    @inject('HashtagRepository') private hashtagRepository: IHashTagRepository,
  ) {}

  public async execute(data: DocumentDto, userId: number): Promise<Document> {
    if (data.files.length === 0)
      throw new AppError('At least one file is requided!');

    const getHashTagsService = new GetHashTagsService(this.hashtagRepository);
    const hashTags: HashTag[] = await getHashTagsService.execute(
      data.hashTags,
      userId,
    );

    const { title, description, files } = data;

    const dataToSave = {
      id: undefined,
      title,
      description,
      userId,
      hashTags,
      files,
    };

    return this.documentRepository.save(dataToSave);
  }
}

export default CreateDocumentService;
