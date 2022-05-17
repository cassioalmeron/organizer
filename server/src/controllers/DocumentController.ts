import { Request, Response } from 'express';
import DocumentRepository from '../Repositories/DocumentRepository';
import CreateDocumentService from '../Services/CreateDocumentService';
import UpdateDocumentService from '../Services/UpdateDocumentService';

class DocumentController {
  async show(request: Request, response: Response): Promise<Response> {
    const { keyWord } = request.query;
    const repository = new DocumentRepository();
    const result = await repository.search(
      keyWord ? String(keyWord) : '',
      request.user.id,
    );
    return response.status(200).json(result);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const repository = new DocumentRepository();
    const document = await repository.findToEdit(Number(id), request.user.id);
    return response.status(200).json(document);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const service = new CreateDocumentService();
    const document = await service.execute(request.body, request.user.id);
    return response.status(201).json(document);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = new UpdateDocumentService();
    const document = await service.execute(
      request.body,
      Number(id),
      request.user.id,
    );
    return response.status(202).json(document);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const repository = new DocumentRepository();
    repository.delete(Number(id), request.user.id);

    return response.status(204).json({});
  }
}

export default new DocumentController();
