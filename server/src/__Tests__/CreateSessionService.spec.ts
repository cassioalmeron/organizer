import 'reflect-metadata';

import CreateSessionService from '../Services/CreateSessionService';
import CreateUserService from '../Services/CreateUserService';
import FakeUserRepository from './fakes/FakeUserRepository';

let fakeUserRepository: FakeUserRepository;
let createSessionService: CreateSessionService;
let createUserService: CreateUserService;

describe('CreateSessionService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createSessionService = new CreateSessionService(fakeUserRepository);
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new session creating a new user', async () => {
    const session = await createSessionService.execute({
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });

    expect(session.user).toMatchObject({
      id: 1,
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });
  });

  it('should be able to create a new session with a existing user', async () => {
    await createUserService.execute({
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });

    const session = await createSessionService.execute({
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });

    expect(session.user).toMatchObject({
      id: 1,
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });
  });
});
