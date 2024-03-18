import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCall1710767349512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'call',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'address_id',
            type: 'uuid',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },

          {
            name: 'service_id',
            type: 'uuid',
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
        foreignKeys: [
          new TableForeignKey({
            name: 'AddressCall',
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'address',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ClientCall',
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'client',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ServiceCall',
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'service',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('call');
  }
}
