import { container } from 'tsyringe';
import IUserRepository from './Repositories/IUserRepository';
import UserRepository from './Repositories/UserRepository';

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

console.log('containers');
