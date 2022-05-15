import 'reflect-metadata';
import 'dotenv/config';

import './database';
import { getRepository } from 'typeorm';
import User from './models/User';
import File from './models/File';
import Document from './models/Document';
import HashtagRepository from './Repositories/HashtagRepository';
import CreateDocumentService from './Services/CreateDocumentService';
import DocumentRepository from './Repositories/DocumentRepository';
import UpdateDocumentService, {
  DocumentDto,
} from './Services/UpdateDocumentService';

async function updateDeocument() {
  const documentRepository = getRepository(Document);
  // let document = documentRepository.create({
  //   userId,
  //   title,
  //   description,
  //   hashTags: [hashtag],
  //   files: [{ url: 'teste' }],
  // });
  // document = await documentRepository.save(document);
  // console.log(document);

  // const document = await documentRepository.findOneOrFail({ id: 7 });
  // console.log(document);
  // document.files.push({ url: 'teste2' });
  // document.files[0].url = 'Teste 2';

  // document = await documentRepository.save(document);
  // console.log(document);

  // const dto: DocumentDto = {
  //   title: 'My Document',
  //   description: 'Created through Service',
  //   hashtags: ['Cassio'],
  //   files: [{ url: 'Teste 2' }],
  // };

  // const service = new CreateDocumentService();
  // const document = await service.execute(dto, 1);

  // console.log(document);

  // const documentRepository = new DocumentRepository();
  // documentRepository.delete(1, 1);

  const dto: DocumentDto = {
    id: 4,
    title: 'New Title',
    hashTags: ['Iclen'],
  };
}

async function test() {
  const repository = getRepository(User);
  const user = await repository.findOneOrFail();
  const userId = user.id;
  const title = 'My Document';
  const description = 'Details of my document with File';

  const hashtagRepository = new HashtagRepository();
  const hashtag = await hashtagRepository.getHashTagSaveIfNotExists(
    'Iclen',
    user.id,
  );
  // console.log(hashtag);

  // const documentRepository = getRepository(Document);
  // let document = documentRepository.create({
  //   userId,
  //   title,
  //   description,
  //   hashTags: [hashtag],
  //   files: [{ url: 'teste' }],
  // });
  // document = await documentRepository.save(document);
  // console.log(document);

  // const document = await documentRepository.findOneOrFail({ id: 7 });
  // console.log(document);
  // document.files.push({ url: 'teste2' });
  // document.files[0].url = 'Teste 2';

  // document = await documentRepository.save(document);
  // console.log(document);

  // const dto: DocumentDto = {
  //   title: 'My Document',
  //   description: 'Created through Service',
  //   hashtags: ['Cassio'],
  //   files: [{ url: 'Teste 2' }],
  // };

  // const service = new CreateDocumentService();
  // const document = await service.execute(dto, 1);

  // console.log(document);

  // const documentRepository = new DocumentRepository();
  // documentRepository.delete(1, 1);
  // const document = await documentRepository.findById(4, 1);

  const dto: DocumentDto = {
    id: 4,
    title: 'New Title',
    // hashTags: ['Iclen'],
    files: [
      { id: 4, url: 'TESTE XXXX' },
      { id: 8, url: 'FSFDFSD' },
    ],
    // files: [],
  };

  const service = new UpdateDocumentService();
  const document = await service.execute(dto, 1);
  console.log(document);

  // const document = await documentRepository.findOneOrFail({
  //   where: { id: 4 },
  //   relations: ['hashTags'],
  // });

  // // document.hashTags.push(hashtag);
  // document.hashTags.splice(1, 1);

  // documentRepository.save(document);
}

setTimeout(() => {
  test();
  // updateDeocument();
}, 500);
