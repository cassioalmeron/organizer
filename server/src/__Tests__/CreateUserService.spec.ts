import FakeUserRepository from '../Repositories/fakes/FakeUserRepository';
import CreateUserService from '../Services/CreateUserService';

let fakeUserRepository: FakeUserRepository;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    createUserService = new CreateUserService(fakeUserRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });

    expect(user.id).toBe(1);
  });

  it('should not be able to create a new user with the same e-mail', async () => {
    await createUserService.execute({
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });

    expect(async () => {
      await createUserService.execute({
        name: 'Cassio Pinheiro Almeron',
        email: 'cassioalmeron@gmail.com',
        socialId: '0123456789',
      });
    }).rejects.toThrow(
      `A user with e-mail 'cassioalmeron@gmail.com' is already registered!`,
    );
  });

  it('should not be able to create a new user with the same socialId', async () => {
    await createUserService.execute({
      name: 'Cassio Almeron',
      email: 'cassioalmeron@gmail.com',
      socialId: '1234567890',
    });

    expect(async () => {
      await createUserService.execute({
        name: 'Cassio Pinheiro Almeron',
        email: 'cassioalmeron@hotmail.com',
        socialId: '1234567890',
      });
    }).rejects.toThrow(
      `A user with Social Id '1234567890' is already registered!`,
    );
  });
});
