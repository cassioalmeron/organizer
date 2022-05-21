import { container } from 'tsyringe';
import IUserRepository from './Repositories/IUserRepository';
import HashTagRepository from './Repositories/HashTagRepository';
import IHashtagRepository from './Repositories/IHashTagRepository';
import UserRepository from './Repositories/UserRepository';
import DocumentRepository from './Repositories/DocumentRepository';
import IDocumentRepository from './Repositories/IDocumentRepository';

container.registerSingleton<IDocumentRepository>(
  'DocumentRepository',
  DocumentRepository,
);
container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
container.registerSingleton<IHashtagRepository>(
  'HashtagRepository',
  HashTagRepository,
);
