import User from '../entities/User';

export type CreateUserDto = {
  socialId: string;
  name: string;
  email: string;
};

export default interface IUserRepository {
  findBySocialToken(socialId: string): Promise<User | undefined>;
  emailExists(email: string): Promise<boolean>;
  socialIdExists(socialId: string): Promise<boolean>;
  save(data: CreateUserDto): Promise<User>;
}
