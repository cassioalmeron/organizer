import Document from '../entities/Document';

export default interface IDocumentRepository {
  findById(id: number, userId: number): Promise<Document | undefined>;
  search(keyWord: string, userId: number): Promise<Document[]>;
  save(data: { id?: number }): Promise<Document>;
  delete(id: number, userId: number): Promise<boolean>;
}
