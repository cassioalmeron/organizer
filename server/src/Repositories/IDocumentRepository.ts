import Document from '../entities/Document';

export type SearchResultDto = {
  id: number;
  description: string;
  files: string[];
  hashTags: string[];
};

export default interface IDocumentRepository {
  findById(id: number, userId: number): Promise<Document | undefined>;
  findToEdit(id: number, userId: number): Promise<Document | undefined>;
  search(keyWord: string, userId: number): Promise<SearchResultDto[]>;
  save(data: { id?: number }): Promise<Document>;
  delete(id: number, userId: number): Promise<boolean>;
}
