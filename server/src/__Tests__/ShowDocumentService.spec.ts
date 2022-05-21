import 'reflect-metadata';
import CreateDocumentService, {
  DocumentDto,
} from '../Services/CreateDocumentService';
import ShowDocumentService from '../Services/ShowDocumentService';

import FakeDocumentRepository from './fakes/FakeDocumentRepository';
import FakeHashTagRepository from './fakes/FakeHashTagRepository';

let fakeHashTagRepository: FakeHashTagRepository;
let fakeDocumentRepository: FakeDocumentRepository;
let showDocumentService: ShowDocumentService;

const documentDto: DocumentDto = {
  title: 'My Document',
  hashTags: [],
  files: [{ url: 'http://' }],
};

describe('ShowDocumentService', () => {
  beforeEach(async () => {
    fakeHashTagRepository = new FakeHashTagRepository();
    fakeDocumentRepository = new FakeDocumentRepository();

    const createDocumentService = new CreateDocumentService(
      fakeDocumentRepository,
      fakeHashTagRepository,
    );
    await createDocumentService.execute(documentDto, 1);

    showDocumentService = new ShowDocumentService(fakeDocumentRepository);
  });

  it('Should return existing document', async () => {
    const deleted = await showDocumentService.execute(1, 1);
    expect(deleted).not.toBe(undefined);
    expect(deleted?.id).toBe(1);
  });

  it('Should not return a not existing document', async () => {
    const deleted = await showDocumentService.execute(2, 1);
    expect(deleted).toBe(undefined);
  });

  it('Should not return a existing document fo another user', async () => {
    const deleted = await showDocumentService.execute(1, 2);
    expect(deleted).toBe(undefined);
  });
});
