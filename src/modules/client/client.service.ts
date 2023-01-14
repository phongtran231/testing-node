import { Between, Repository } from 'typeorm';
import { FootBallMatch } from '../../entities/foot-ball-match.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import moment from 'moment';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(FootBallMatch)
    private footBallMatchRepository: Repository<FootBallMatch>,
  ) {}

  async getAllMatch(options: IPaginationOptions) {
    try {
      const result = await paginate<FootBallMatch>(
        this.footBallMatchRepository,
        options,
        {
          select: {
            id: true,
            on_time: true,
            home_team_id: true,
            guest_team_id: true,
            home_score: true,
            guest_score: true,
          },
          relations: {
            homeTeam: true,
            guestTeam: true,
          },
        },
      );
      const response = new Pagination(
        await this.mappingResponse(result.items),
        result.meta,
      );
      return {
        status: 'success',
        data: response,
        trace: undefined,
      };
    } catch (error) {
      return {
        status: 'error',
        trace: error.toString(),
        data: null,
      };
    }
  }

  async getMatchesOnDate(options: IPaginationOptions, date: Date) {
    try {
      const cloneDate = new Date(date);
      cloneDate.setDate(cloneDate.getDate() + 1);
      const result = await paginate(this.footBallMatchRepository, options, {
        where: {
          on_time: Between(date, cloneDate),
        },
        relations: {
          homeTeam: true,
          guestTeam: true,
        },
        select: {
          id: true,
          home_team_id: true,
          guest_team_id: true,
          home_score: true,
          guest_score: true,
          on_time: true,
        },
      });
      const response = new Pagination(
        await this.mappingResponse(result.items),
        result.meta,
      );
      return {
        status: 'success',
        data: response,
        trace: undefined,
      };
    } catch (error) {
      return {
        status: 'error',
        trace: error.toString(),
        data: null,
      };
    }
  }

  private async mappingResponse(items: FootBallMatch[]) {
    return items.map((item) => {
      let status = 'FT';
      const diffTimeMatch = moment(item.on_time).diff(moment.now(), 'minutes');
      if (diffTimeMatch > 0 && diffTimeMatch <= 90) {
        status = 'LIVE';
      }
      if (diffTimeMatch > 90) {
        status = '';
      }
      return {
        id: item.id,
        home_team: item.homeTeam,
        guest_team: item.guestTeam,
        status,
        score_converted: `${item.home_score}-${item.guest_score}`,
        home_score: item.home_score,
        guest_score: item.guest_score,
        on_time: item.on_time,
      };
    });
  }
}
