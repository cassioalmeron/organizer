import 'reflect-metadata';
import CreateDocumentService, {
  DocumentDto,
} from '../Services/CreateDocumentService';
import SearchDocumentService from '../Services/SearchDocumentService';

import FakeDocumentRepository from './fakes/FakeDocumentRepository';
import FakeHashTagRepository from './fakes/FakeHashTagRepository';

let fakeHashTagRepository: FakeHashTagRepository;
let fakeDocumentRepository: FakeDocumentRepository;
let searchDocumentService: SearchDocumentService;

const documentDto: DocumentDto = {
  title: 'My Document ',
  hashTags: [],
  files: [{ url: 'http://' }],
};

describe('SearchDocumentService', () => {
  beforeEach(async () => {
    fakeHashTagRepository = new FakeHashTagRepository();
    fakeDocumentRepository = new FakeDocumentRepository();

    const createDocumentService = new CreateDocumentService(
      fakeDocumentRepository,
      fakeHashTagRepository,
    );

    let documentToAdd = { ...documentDto, title: `${documentDto.title} 1` };
    await createDocumentService.execute(documentToAdd, 1);
    documentToAdd = { ...documentDto, title: `${documentDto.title} 2` };
    await createDocumentService.execute(documentToAdd, 1);
    documentToAdd = { ...documentDto, title: `${documentDto.title} 3` };
    await createDocumentService.execute(documentToAdd, 1);

    documentToAdd = { ...documentDto, title: `${documentDto.title} 3` };
    await createDocumentService.execute(documentToAdd, 2);

    searchDocumentService = new SearchDocumentService(fakeDocumentRepository);
  });

  it('Without keyword Should return all document of the user', async () => {
    const documents = await searchDocumentService.execute('', 1);

    expect(documents.length).toBe(3);
  });

  it('With keyword should filter document of the user', async () => {
    const documents = await searchDocumentService.execute('3', 1);

    expect(documents.length).toBe(1);
    expect(documents[0].id).toBe(3);
  });
});
