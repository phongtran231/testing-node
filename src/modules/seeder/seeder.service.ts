import { FootBallMatch } from '../../entities/foot-ball-match.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import moment from 'moment';
import { FootBallTeam } from '../../entities/foot-ball-team.entity';

@Injectable()
export class SeederService {
  constructor(
    @InjectRepository(FootBallTeam)
    private footBallTeamRepository: Repository<FootBallTeam>,
    @InjectRepository(FootBallMatch)
    private footBallMatchRepository: Repository<FootBallMatch>,
  ) {}

  async runSeed() {
    try {
      const insertedTeams = await this.footBallTeamRepository.save(
        fakerTeamNames.map((team) => ({
          name: team.name,
          avatar: team.avatar,
        })),
      );
      const getTeam = () => {
        return insertedTeams[Math.floor(Math.random() * insertedTeams.length)];
      };
      const matchInOneDay = 3;
      const totalDaysForMatch = 10;
      const matchData = [];
      for (let startDay = -1; startDay <= totalDaysForMatch; startDay++) {
        for (let i = 0; i < matchInOneDay; i++) {
          const now = moment(moment.now());
          const firstTeam = getTeam();
          let secondTeam = getTeam();
          if (secondTeam.name === firstTeam.name) {
            secondTeam = getTeam();
          }
          matchData.push({
            on_time: now
              .add(startDay, 'days')
              .add(i + 3, 'hours')
              .format('YYYY-MM-DD HH:mm:ss'),
            home_team_id: firstTeam.id,
            guest_team_id: secondTeam.id,
            home_score: startDay < 0 ? Math.random() * 11 : 0,
            guest_score: startDay < 0 ? Math.random() * 11 : 0,
          });
        }
      }
      await this.footBallMatchRepository.save(matchData);
      return Promise.resolve();
    } catch (err) {
      console.log('run seeder error', err);
      return Promise.reject(err);
    }
  }

  rollbackSeed() {
    try {
      this.footBallTeamRepository.clear();
      this.footBallMatchRepository.clear();
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }
}

const fakerTeamNames = [
  {
    name: 'Arsenal',
    avatar: 'https://sport.guim.co.uk/football/crests/60/1006.png',
  },
  {
    name: 'Man City',
    avatar: 'https://sport.guim.co.uk/football/crests/60/11.png',
  },
  {
    name: 'Newcastle',
    avatar: 'https://sport.guim.co.uk/football/crests/60/31.png',
  },
  {
    name: 'Man Utd',
    avatar: 'https://sport.guim.co.uk/football/crests/60/12.png',
  },
  {
    name: 'Spurs',
    avatar: 'https://sport.guim.co.uk/football/crests/60/19.png',
  },
  {
    name: 'Liverpool',
    avatar: 'https://sport.guim.co.uk/football/crests/60/9.png',
  },
  {
    name: 'Fulham',
    avatar: 'https://sport.guim.co.uk/football/crests/60/55.png',
  },
  {
    name: 'Brighton',
    avatar: 'https://sport.guim.co.uk/football/crests/60/6795.png',
  },
  {
    name: 'Brentford',
    avatar: 'https://sport.guim.co.uk/football/crests/60/48.png',
  },
  {
    name: 'Chelsea',
    avatar: 'https://sport.guim.co.uk/football/crests/60/4.png',
  },
  {
    name: 'Aston Villa',
    avatar: 'https://sport.guim.co.uk/football/crests/60/2.png',
  },
  {
    name: 'C Palace',
    avatar: 'https://sport.guim.co.uk/football/crests/60/5.png',
  },
  {
    name: 'Leicester',
    avatar: 'https://sport.guim.co.uk/football/crests/60/29.png',
  },
  {
    name: 'Leeds',
    avatar: 'https://sport.guim.co.uk/football/crests/60/28.png',
  },
  {
    name: 'Nottm Forest',
    avatar: 'https://sport.guim.co.uk/football/crests/60/15.png',
  },
  {
    name: 'AFC Bournemouth',
    avatar: 'https://sport.guim.co.uk/football/crests/60/23.png',
  },
  {
    name: 'West Ham',
    avatar: 'https://sport.guim.co.uk/football/crests/60/43.png',
  },
  {
    name: 'Everton',
    avatar: 'https://sport.guim.co.uk/football/crests/60/8.png',
  },
  {
    name: 'Wolves',
    avatar: 'https://sport.guim.co.uk/football/crests/60/44.png',
  },
  {
    name: 'Southampton',
    avatar: 'https://sport.guim.co.uk/football/crests/60/18.png',
  },
];
