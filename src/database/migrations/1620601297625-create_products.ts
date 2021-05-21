import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createProducts1620601297625 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "price",
            type: "float",
          },
          {
            name: "quantity",
            type: "integer",
          },
          {
            name: "color",
            type: "varchar",
          },
          {
            name: "main_detail",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "specification",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("products");
  }
}
