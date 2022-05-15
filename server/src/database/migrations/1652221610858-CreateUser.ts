import { MigrationInterface, QueryRunner, Table, TableUnique } from 'typeorm';

export default class CreateUser1652221610858 implements MigrationInterface {
  private tableName = 'user';

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
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'social_id',
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

    const categoryUniqueConstraint = new TableUnique({
      name: 'user:email',
      columnNames: ['email'],
    });
    await queryRunner.createUniqueConstraint(
      this.tableName,
      categoryUniqueConstraint,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(this.tableName, 'user:email');
    await queryRunner.dropTable(this.tableName);
  }
}
