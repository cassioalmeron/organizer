/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';
import AppError from '../errors/AppError';
import User from '../entities/User';
import IUserRepository from '../Repositories/IUserRepository';

export type UserDto = {
  name: string;
  email: string;
  socialId: string;
};

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(data: UserDto): Promise<User> {
    const emailExists = await this.userRepository.emailExists(data.email);
    if (emailExists)
      throw new AppError(
        `A user with e-mail '${data.email}' is already registered!`,
      );

    const socialIdExists = await this.userRepository.socialIdExists(
      data.socialId,
    );
    if (socialIdExists)
      throw new AppError(
        `A user with Social Id '${data.socialId}' is already registered!`,
      );

    const user = await this.userRepository.save(data);
    return user;
  }
}

export default CreateUserService;
