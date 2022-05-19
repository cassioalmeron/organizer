import 'reflect-metadata';

import GetHashTagsService from '../Services/GetHashTagsService';
import FakeHashTagRepository from './fakes/FakeHashTagRepository';

let fakeHashTagRepository: FakeHashTagRepository;
let getHashTagsService: GetHashTagsService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeHashTagRepository = new FakeHashTagRepository();
    getHashTagsService = new GetHashTagsService(fakeHashTagRepository);
  });

  it('should save two Tags', async () => {
    const hashTags = await getHashTagsService.execute(['Document', 'Photo'], 1);

    expect(hashTags[0]).toMatchObject({
      id: 1,
      description: 'Document',
      userId: 1,
    });

    expect(hashTags[1]).toMatchObject({
      id: 2,
      description: 'Photo',
      userId: 1,
    });
  });

  it('should just get existing at secont time', async () => {
    await getHashTagsService.execute(['Document', 'Photo'], 1);
    const hashTags = await getHashTagsService.execute(['Document'], 1);

    expect(hashTags[0]).toMatchObject({
      id: 1,
      description: 'Document',
      userId: 1,
    });
  });
});
