/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Document from '../models/Document';
import DocumentRepository from '../Repositories/DocumentRepository';
import HashtagRepository from '../Repositories/HashtagRepository';

export type DocumentDto = {
  title?: string;
  description?: string;
  hashTags?: string[];
  files?: {
    id?: number;
    url: string;
  }[];
};

class UpdateDocumentService {
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
      const hashtagRepository = new HashtagRepository();
      const hashTagToSave = await hashtagRepository.getHashTags(
        hashTags,
        userId,
      );
      dataToSave.hashTags = hashTagToSave;
    }

    const documentRepository = new DocumentRepository();
    let document = await documentRepository.findById(id, userId);
    if (document) {
      Object.assign(document, dataToSave);
      document = await documentRepository.save(document);
    }
    return document;
  }
}

export default UpdateDocumentService;
