import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateClientService1710767345730
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'client_service',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'id_client_service_external',
            type: 'int',
          },
          {
            name: 'status_prefix',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'enabled_in',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'technology',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'service_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'interface_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'interface_routing_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'equipament_connection_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'equipament_routing_id',
            type: 'uuid',
            isNullable: true,
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
            name: 'AddressClientService',
            columnNames: ['address_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'address',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ClientClientService',
            columnNames: ['client_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'client',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'ServiceClientService',
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'service',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'InterfaceClientService',
            columnNames: ['interface_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'interface',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'InterfaceRoutingClientService',
            columnNames: ['interface_routing_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'interface_routing',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'EquipamentConnectionClientService',
            columnNames: ['equipament_connection_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'equipament_connection',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
          new TableForeignKey({
            name: 'EquipamentRoutingClientService',
            columnNames: ['equipament_routing_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'equipament_routing',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE',
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('client_service');
  }
}
