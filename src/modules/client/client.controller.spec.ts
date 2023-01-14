import { ClientController } from './client.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { ClientService } from './client.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FootBallMatch } from '../../entities/foot-ball-match.entity';
import { Repository } from 'typeorm';

describe('clientController', () => {
  let clientController: ClientController;
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(FootBallMatch),
          useClass: Repository,
        },
      ],
    }).compile();

    clientController = app.get<ClientController>(ClientController);
  });

  it('get all matches success', async () => {
    const result = {
      status: 'success',
      data: [Object],
      trace: null,
    };
    jest
      .spyOn(clientController, 'getFullMatches')
      .mockImplementation(() => Promise.resolve(result));
    expect(await clientController.getFullMatches()).toBe(result);
  });

  it('get matches error', async () => {
    const result = {
      status: 'error',
      data: null,
      trace: 'something error',
    };
    jest
      .spyOn(clientController, 'getFullMatches')
      .mockImplementation(() => Promise.resolve(result));
    expect(await clientController.getFullMatches()).toBe(result);
  });

  it('get match on date success', async () => {
    const result = {
      status: 'success',
      data: [Object],
      trace: null,
    };
    jest
      .spyOn(clientController, 'getMatchOnDate')
      .mockImplementation(() => Promise.resolve(result));
    const paramsMock = {
      date: new Date('2022-10-01'),
    };
    expect(await clientController.getMatchOnDate(1, 1, paramsMock)).toBe(
      result,
    );
  });

  it('get match on date error', async () => {
    const result = {
      status: 'error',
      data: null,
      trace: 'something error',
    };
    jest
      .spyOn(clientController, 'getMatchOnDate')
      .mockImplementation(() => Promise.resolve(result));
    const paramsMock = {
      date: new Date('2022-13-01'),
    };
    expect(await clientController.getMatchOnDate(1, 1, paramsMock)).toBe(
      result,
    );
  });
});
