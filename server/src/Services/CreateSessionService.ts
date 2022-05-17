/* eslint-disable no-useless-constructor */
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import CreateUserService from './CreateUserService';
import IUserRepository from '../Repositories/IUserRepository';
import authConfig from '../config/auth';

type CreateSessionDto = {
  name: string;
  email: string;
  socialId: string;
};

type ResponseDto = {
  token: string;
  user: User;
};

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
  ) {}

  public async execute(data: CreateSessionDto): Promise<ResponseDto> {
    let user = await this.userRepository.findBySocialToken(data.socialId);

    if (!user) {
      const createUserService = new CreateUserService(this.userRepository);
      user = await createUserService.execute(data);
    }

    const token = createSessionToken(user.id);

    return { user, token };
  }
}

export default CreateSessionService;

function createSessionToken(id: number): string {
  const token = jwt.sign({ id }, authConfig.secretSession, {
    expiresIn: authConfig.expiresIn,
  });
  return token;
}
