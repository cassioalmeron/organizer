import { Entity, Column } from 'typeorm';
import ModelBase from './ModelBase';

@Entity('hashtag')
class HashTag extends ModelBase {
  @Column()
  userId: number;

  @Column()
  description: string;
}

export default HashTag;
