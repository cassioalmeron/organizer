import { Request, Response } from 'express';

class DefaultController {
  async index(request: Request, response: Response): Promise<Response> {
    return response.json({ message: 'It works!' });
  }
}

export default new DefaultController();
