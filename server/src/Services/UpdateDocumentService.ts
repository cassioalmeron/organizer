/* eslint-disable no-useless-constructor */
/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { inject, injectable } from 'tsyringe';
import Document from '../entities/Document';
import IDocumentRepository from '../Repositories/IDocumentRepository';
import IHashTagRepository from '../Repositories/IHashTagRepository';
import GetHashTagsService from './GetHashTagsService';

export type DocumentDto = {
  title?: string;
  description?: string;
  hashTags?: string[];
  files?: {
    id?: number;
    url: string;
  }[];
};

@injectable()
class UpdateDocumentService {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,
    @inject('HashtagRepository') private hashtagRepository: IHashTagRepository,
  ) {}

  public async execute(
    data: DocumentDto,
    id: number,
    userId: number,
  ): Promise<Document | undefined> {
    const { title, description, hashTags, files } = data;

    const dataToSave: any = {
      title,
      description,
      files,
    };

    if (hashTags) {
      const getHashTagsService = new GetHashTagsService(this.hashtagRepository);
      const hashTagToSave = await getHashTagsService.execute(hashTags, userId);
      dataToSave.hashTags = hashTagToSave;
    }

    let document = await this.documentRepository.findById(id, userId);
    if (document) {
      Object.assign(document, dataToSave);
      document = await this.documentRepository.save(document);
    }
    return document;
  }
}

export default UpdateDocumentService;
