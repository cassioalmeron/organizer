import User from '../../models/User';
import IUserRepository, { CreateUserDto } from '../IUserRepository';

class FakeUserRepository implements IUserRepository {
  private users: User[] = [];

  public async findBySocialToken(socialId: string): Promise<User | undefined> {
    const user = this.users.find(item => item.socialId === socialId);
    return user;
  }

  public async emailExists(email: string): Promise<boolean> {
    const emailExists =
      this.users.filter(user => user.email === email).length > 0;
    return emailExists;
  }

  public async socialIdExists(socialId: string): Promise<boolean> {
    const exists =
      this.users.filter(user => user.socialId === socialId).length > 0;
    return exists;
  }

  public async save(data: CreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(
      user,
      {
        id: this.getNextId(),
      },
      data,
    );

    this.users.push(user);

    return user;
  }

  private getNextId(): number {
    if (this.users.length === 0) return 1;
    return this.users[this.users.length - 1].id + 1;
  }
}

export default FakeUserRepository;
