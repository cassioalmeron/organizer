import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { container } from 'tsyringe';
import authConfig from '../config/auth';
import CreateSessionService from '../Services/CreateSessionService';
import { UserDto } from '../Services/CreateUserService';

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

    const service = container.resolve(CreateSessionService);
    const session = await service.execute(decoded);

    const { token, user } = session;
    const { name, email } = user;

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

export default new SessionController();
