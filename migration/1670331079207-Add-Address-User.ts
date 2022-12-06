import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressUser1670331079207 implements MigrationInterface {
    name = 'AddAddressUser1670331079207'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "address" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "address"`);
    }

}
