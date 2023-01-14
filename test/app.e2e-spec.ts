import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FootBallMatch } from '../src/entities/foot-ball-match.entity';
import { FootBallTeam } from '../src/entities/foot-ball-team.entity';
import { config } from 'dotenv';

config();

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        TypeOrmModule.forRoot({
          type: 'mysql',
          database: 'test',
          entities: [FootBallMatch, FootBallTeam],
          logging: false,
          synchronize: true,
          host: process.env.MYSQL_HOST,
          port: 3306,
          username: process.env.MYSQL_USER,
          password: process.env.MYSQL_PASSWORD,
          keepConnectionAlive: false,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    request(app.getHttpServer())
      .get('/matches')
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.data).toEqual({
          items: [],
          meta: {
            currentPage: 1,
            itemCount: 0,
            itemsPerPage: 10,
            totalItems: 0,
            totalPages: 0,
          },
        });
      });
  });

  it('/:date (GET)', () => {
    const fakeDate = '2023-01-01';
    request(app.getHttpServer())
      .get(`/matches/${fakeDate}`)
      .then((response) => {
        expect(response.status).toEqual(200);
        expect(response.body.data).toEqual({
          items: [],
          meta: {
            currentPage: 1,
            itemCount: 0,
            itemsPerPage: 10,
            totalItems: 0,
            totalPages: 0,
          },
        });
      });
  });

  it('/:date (GET)', () => {
    const fakeDate = 'abc';
    request(app.getHttpServer())
      .get(`/matches/${fakeDate}`)
      .then((response) => {
        expect(response.status).toEqual(400);
        expect(response.body.error).toEqual('Bad Request');
      });
  });

  afterAll((done) => {
    app.close();
    done();
  });
});
