import { Entity, Column, ManyToOne } from 'typeorm';
import ModelBase from './ModelBase';
import Document from './Document';

@Entity('file')
class File extends ModelBase {
  @Column()
  documentId: number;

  @Column()
  url: string;

  @ManyToOne(() => Document, document => document.files, {
    orphanedRowAction: 'delete',
  })
  document: Document;
}

export default File;
