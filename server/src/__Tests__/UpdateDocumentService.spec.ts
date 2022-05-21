import 'reflect-metadata';
import CreateDocumentService, {
  DocumentDto,
} from '../Services/CreateDocumentService';
import UpdateDocumentService from '../Services/UpdateDocumentService';

import FakeDocumentRepository from './fakes/FakeDocumentRepository';
import FakeHashTagRepository from './fakes/FakeHashTagRepository';

let fakeHashTagRepository: FakeHashTagRepository;
let fakeDocumentRepository: FakeDocumentRepository;
let createDocumentService: CreateDocumentService;
let updateDocumentService: UpdateDocumentService;

const documentDto: DocumentDto = {
  title: 'My Document',
  hashTags: [],
  files: [{ url: 'http://' }],
};

describe('UpdateDocumentService', () => {
  beforeEach(async () => {
    fakeHashTagRepository = new FakeHashTagRepository();
    fakeDocumentRepository = new FakeDocumentRepository();
    createDocumentService = new CreateDocumentService(
      fakeDocumentRepository,
      fakeHashTagRepository,
    );
    updateDocumentService = new UpdateDocumentService(
      fakeDocumentRepository,
      fakeHashTagRepository,
    );

    const documentToAdd = { ...documentDto, title: `${documentDto.title} 1` };
    await createDocumentService.execute(documentToAdd, 1);
  });

  it('should be able to create a new document', async () => {
    await updateDocumentService.execute({ description: 'ABC' }, 1, 1);

    const documentFromRepository = await fakeDocumentRepository.findById(1, 1);

    expect(documentFromRepository).toMatchObject({
      description: 'ABC',
    });
  });
});
