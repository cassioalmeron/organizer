import { inject, injectable } from 'tsyringe';
import IDocumentRepository from '../Repositories/IDocumentRepository';

@injectable()
class DeleteDocumentService {
  constructor(
    @inject('DocumentRepository')
    private documentRepository: IDocumentRepository,
  ) {}

  public async execute(id: number, userId: number): Promise<boolean> {
    return this.documentRepository.delete(Number(id), userId);
  }
}

export default DeleteDocumentService;
