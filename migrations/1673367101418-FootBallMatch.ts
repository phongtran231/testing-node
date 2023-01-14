import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const tableName = 'foot_ball_matches';

export class FootBallMatch1673367101418 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'on_time',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'home_team_id',
            type: 'int',
          },
          {
            name: 'guest_team_id',
            type: 'int',
          },
          {
            name: 'home_score',
            type: 'int',
            default: 0,
          },
          {
            name: 'guest_score',
            type: 'int',
            default: 0,
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
    await queryRunner.createIndices(tableName, [
      new TableIndex({
        name: 'IDX_foot_ball_match_on_time',
        columnNames: ['on_time'],
      }),
      new TableIndex({
        name: 'IDX_foot_ball_match_home_team_id',
        columnNames: ['home_team_id'],
      }),
      new TableIndex({
        name: 'IDX_foot_ball_match_guest_team_id',
        columnNames: ['guest_team_id'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(tableName, 'IDX_foot_ball_match_on_time');
    await queryRunner.dropIndex(tableName, 'IDX_foot_ball_match_home_team_id');
    await queryRunner.dropIndex(tableName, 'IDX_foot_ball_match_guest_team_id');
    await queryRunner.dropTable(tableName);
  }
}
