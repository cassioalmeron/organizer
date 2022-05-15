/* eslint-disable no-await-in-loop */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import AppError from '../errors/AppError';
import Document from '../models/Document';
import HashTag from '../models/HashTag';
import User from '../models/User';
import DocumentRepository from '../Repositories/DocumentRepository';
import HashtagRepository from '../Repositories/HashtagRepository';
import UserRepository from '../Repositories/UserRepository';

export type UserDto = {
  name: string;
  email: string;
  socialId: string;
};

class CreateUserService {
  public async execute(data: UserDto): Promise<User> {
    const userRepository = new UserRepository();

    const emailExists = await userRepository.emailExists(data.email);
    if (emailExists)
      throw new AppError(
        `A user with e-mail '${data.email}' is already registred!`,
      );

    const user = await userRepository.save(data);
    return user;
  }
}

export default CreateUserService;
