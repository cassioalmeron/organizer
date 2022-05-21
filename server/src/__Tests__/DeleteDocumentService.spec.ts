import 'reflect-metadata';
import CreateDocumentService, {
  DocumentDto,
} from '../Services/CreateDocumentService';
import DeleteDocumentService from '../Services/DeleteDocumentService';

import FakeDocumentRepository from './fakes/FakeDocumentRepository';
import FakeHashTagRepository from './fakes/FakeHashTagRepository';

let fakeHashTagRepository: FakeHashTagRepository;
let fakeDocumentRepository: FakeDocumentRepository;
let deleteDocumentService: DeleteDocumentService;

const documentDto: DocumentDto = {
  title: 'My Document',
  hashTags: [],
  files: [{ url: 'http://' }],
};

describe('DeleteDocumentService', () => {
  beforeEach(async () => {
    fakeHashTagRepository = new FakeHashTagRepository();
    fakeDocumentRepository = new FakeDocumentRepository();

    const createDocumentService = new CreateDocumentService(
      fakeDocumentRepository,
      fakeHashTagRepository,
    );
    await createDocumentService.execute(documentDto, 1);

    deleteDocumentService = new DeleteDocumentService(fakeDocumentRepository);
  });

  it('Should delete existing document', async () => {
    const deleted = await deleteDocumentService.execute(1, 1);
    expect(deleted).toBe(true);
  });

  it('Should not delete a not existing document', async () => {
    const deleted = await deleteDocumentService.execute(2, 1);
    expect(deleted).toBe(false);
  });

  it('Should not delete a existing document fo another user', async () => {
    const deleted = await deleteDocumentService.execute(1, 2);
    expect(deleted).toBe(false);
  });
});
