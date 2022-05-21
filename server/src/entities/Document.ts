import { Entity, Column, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import HashTag from './HashTag';
import File from './File';
import ModelBase from './ModelBase';

@Entity('document')
class Document extends ModelBase {
  @Column()
  userId: number;

  @Column()
  title: string;

  @Column()
  description?: string;

  @ManyToMany(() => HashTag)
  @JoinTable({
    name: 'document_hashtag',
    joinColumn: { name: 'document_id' },
    inverseJoinColumn: { name: 'hashtag_id' },
  })
  hashTags: HashTag[];

  @OneToMany(() => File, file => file.document, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  files: File[];
}

export default Document;
