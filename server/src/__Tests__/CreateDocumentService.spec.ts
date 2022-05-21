import 'reflect-metadata';
import CreateDocumentService, {
  DocumentDto,
} from '../Services/CreateDocumentService';

import FakeDocumentRepository from './fakes/FakeDocumentRepository';
import FakeHashTagRepository from './fakes/FakeHashTagRepository';

let fakeHashTagRepository: FakeHashTagRepository;
let fakeDocumentRepository: FakeDocumentRepository;
let createDocumentService: CreateDocumentService;

const documentDto: DocumentDto = {
  title: 'My Document',
  hashTags: [],
  files: [{ url: 'http://' }],
};

describe('CreateDocumentService', () => {
  beforeEach(() => {
    fakeHashTagRepository = new FakeHashTagRepository();
    fakeDocumentRepository = new FakeDocumentRepository();
    createDocumentService = new CreateDocumentService(
      fakeDocumentRepository,
      fakeHashTagRepository,
    );
  });

  it('should be able to create a new document', async () => {
    const document = await createDocumentService.execute(documentDto, 1);

    expect(document).toMatchObject({
      id: 1,
      userId: 1,
      title: documentDto.title,
      files: documentDto.files,
    });
  });

  it('should not be able to create a new document without at least one file', async () => {
    const newDocument: DocumentDto = { ...documentDto };
    newDocument.files = [];

    await expect(async () => {
      await createDocumentService.execute(newDocument, 1);
    }).rejects.toHaveProperty('message', 'At least one file is requided!');
  });
});
