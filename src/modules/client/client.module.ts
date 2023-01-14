import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FootBallTeam } from '../../entities/foot-ball-team.entity';
import { FootBallMatch } from '../../entities/foot-ball-match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FootBallTeam, FootBallMatch])],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
