import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export default class CreateHashTag1652222524356 implements MigrationInterface {
  private tableName = 'hashtag';

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
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
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
        name: 'hashtag-user-fk',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    const categoryUniqueConstraint = new TableUnique({
      name: 'user:user_id-description',
      columnNames: ['user_id', 'description'],
    });
    await queryRunner.createUniqueConstraint(
      this.tableName,
      categoryUniqueConstraint,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(
      this.tableName,
      'user:user_id-description',
    );
    await queryRunner.dropForeignKey(this.tableName, 'hashtag-user-fk');
    await queryRunner.dropTable(this.tableName);
  }
}
