import { Request, Response } from 'express';
import { container } from 'tsyringe';
import DocumentRepository from '../Repositories/DocumentRepository';
import CreateDocumentService from '../Services/CreateDocumentService';
import DeleteDocumentService from '../Services/DeleteDocumentService';
import SearchDocumentService from '../Services/SearchDocumentService';
import UpdateDocumentService from '../Services/UpdateDocumentService';

class DocumentController {
  async show(request: Request, response: Response): Promise<Response> {
    const { keyWord } = request.query;
    const searchDocumentService = container.resolve(SearchDocumentService);
    const result = await searchDocumentService.execute(
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
    const createDocumentService = container.resolve(CreateDocumentService);
    const document = await createDocumentService.execute(
      request.body,
      request.user.id,
    );
    return response.status(201).json(document);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const updateDocumentService = container.resolve(UpdateDocumentService);
    const document = await updateDocumentService.execute(
      request.body,
      Number(id),
      request.user.id,
    );
    return response.status(202).json(document);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteDocumentService = container.resolve(DeleteDocumentService);
    const deleted = await deleteDocumentService.execute(
      Number(id),
      request.user.id,
    );

    return response.status(deleted ? 204 : 410).json({});
  }
}

export default new DocumentController();
