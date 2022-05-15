import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

class TestController {
  async index(request: Request, response: Response): Promise<Response> {
    const token = generateSocialTokenEnconded();
    return response.json({ token });
  }
}

export default new TestController();

type TokenPayload = {
  name: string;
  email: string;
  socialId: string;
};

function generateSocialTokenEnconded(): string {
  const payload: TokenPayload = {
    name: 'Cassio Almeron',
    email: 'cassioalmeron@gmail.com',
    socialId: 'TtXxhJfSfISS705pD0deOSJbPWw2',
  };

  const token = jwt.sign(payload, authConfig.secretSocialKey, {
    expiresIn: authConfig.expiresIn,
  });
  return token;
}
