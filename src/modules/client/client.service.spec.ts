import { ClientService } from './client.service';
import { FootBallMatch } from '../../entities/foot-ball-match.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('clientService', () => {
  let service: ClientService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: getRepositoryToken(FootBallMatch),
          useValue: {
            paginate: jest.fn(),
          },
        },
      ],
    }).compile();
    service = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('get all matches success', async () => {
    const result = {
      status: 'success',
      data: [Object],
      trace: null,
    };
    jest
      .spyOn(service, 'getAllMatch')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.getAllMatch({ page: 1, limit: 1 })).toBe(result);
  });

  it('get match with date success', async () => {
    const result = {
      status: 'success',
      data: [Object],
      trace: null,
    };
    jest
      .spyOn(service, 'getMatchesOnDate')
      .mockImplementation(() => Promise.resolve(result));
    expect(
      await service.getMatchesOnDate(
        { page: 1, limit: 1 },
        new Date('2022-10-10'),
      ),
    ).toBe(result);
  });

  it('get all matches error', async () => {
    const result = {
      status: 'error',
      data: null,
      trace: 'something error',
    };
    jest
      .spyOn(service, 'getAllMatch')
      .mockImplementation(() => Promise.resolve(result));
    expect(await service.getAllMatch({ page: 1, limit: 1 })).toBe(result);
  });

  it('get match on date error', async () => {
    const result = {
      status: 'error',
      data: null,
      trace: 'something error',
    };
    jest
      .spyOn(service, 'getMatchesOnDate')
      .mockImplementation(() => Promise.resolve(result));
    expect(
      await service.getMatchesOnDate(
        { page: 1, limit: 1 },
        new Date('2022-13-10'),
      ),
    ).toBe(result);
  });
});
