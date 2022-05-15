import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateDocumentHashTag1652481650519
  implements MigrationInterface
{
  private tableName = 'document_hashtag';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'document_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'hashtag_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'document_hashtag-document-fk',
        columnNames: ['document_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'document',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        name: 'document_hashtag-hashtag-fk',
        columnNames: ['hashtag_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'hashtag',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      this.tableName,
      'document_hashtag-document-fk',
    );
    await queryRunner.dropForeignKey(
      this.tableName,
      'document_hashtag-hashtag-fk',
    );
    await queryRunner.dropTable(this.tableName);
  }
}
