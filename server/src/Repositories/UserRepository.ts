import { getRepository, Repository } from 'typeorm';
import User from '../models/User';
import IUserRepository, { CreateUserDto } from './IUserRepository';

class UserRepository implements IUserRepository {
  constructor() {
    this.repository = getRepository(User);
  }

  private repository: Repository<User>;

  public async findBySocialToken(socialId: string): Promise<User | undefined> {
    const user = await this.repository.findOne({ socialId });
    return user;
  }

  public async emailExists(email: string): Promise<boolean> {
    const emailExists = (await this.repository.count({ email })) > 0;
    return emailExists;
  }

  public async socialIdExists(socialId: string): Promise<boolean> {
    const exists = (await this.repository.count({ socialId })) > 0;
    return exists;
  }

  public async save(data: CreateUserDto): Promise<User> {
    let user = await this.repository.create(data);
    user = await this.repository.save(user);
    return user;
  }
}

export default UserRepository;
