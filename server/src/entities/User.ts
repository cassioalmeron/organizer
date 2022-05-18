import { Entity, Column } from 'typeorm';
import ModelBase from './ModelBase';

@Entity('user')
class User extends ModelBase {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  socialId?: string;
}

export default User;
