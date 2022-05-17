/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import Document from '../models/Document';
import HashTag from '../models/HashTag';
import DocumentRepository from '../Repositories/DocumentRepository';
import HashtagRepository from '../Repositories/HashtagRepository';

export type DocumentDto = {
  title: string;
  description: string;
  hashTags: string[];
  files: {
    url: string;
  }[];
};

class CreateDocumentService {
  public async execute(data: DocumentDto, userId: number): Promise<Document> {
    const hashtagRepository = new HashtagRepository();
    const hashTags: HashTag[] = await hashtagRepository.getHashTags(
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

    const documentRepository = new DocumentRepository();
    return documentRepository.save(dataToSave);
  }
}

export default CreateDocumentService;
