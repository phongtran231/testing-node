import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class FootBallTeam1673343000039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'foot_ball_teams',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
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
    await queryRunner.createIndex(
      'foot_ball_teams',
      new TableIndex({
        name: 'IDX_foot_ball_teams_name',
        columnNames: ['name'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('foot_ball_teams', 'IDX_foot_ball_teams_name');
    await queryRunner.dropTable('foot_ball_teams');
  }
}
