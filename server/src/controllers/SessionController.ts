import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';
import UserRepository from '../Repositories/UserRepository';
import CreateUserService, { UserDto } from '../Services/CreateUserService';

type RequestDto = {
  token: string;
};

type ResponseDto = {
  token: string;
  user: {
    name: string;
    email: string;
  };
};

class SessionController {
  async create(request: Request, response: Response): Promise<Response> {
    const requestData: RequestDto = request.body;

    const decoded = decodeRequestData(requestData.token);

    const userRepository = new UserRepository();
    let user = await userRepository.findBySocialToken(decoded.socialId);

    if (!user) {
      const createUserService = new CreateUserService();
      user = await createUserService.execute(decoded);
    }

    const { id, name, email } = user;

    const token = createSessionToken(id);

    const res: ResponseDto = {
      token,
      user: {
        name,
        email,
      },
    };

    return response.status(201).json(res);
  }
}

function decodeRequestData(token: string): UserDto {
  const decoded = jwt.verify(
    token ?? '',
    authConfig.secretSocialKey,
  ) as UserDto;

  return decoded;
}

function createSessionToken(id: number): string {
  const token = jwt.sign({ id }, authConfig.secretSession, {
    expiresIn: authConfig.expiresIn,
  });
  return token;
}

export default new SessionController();
