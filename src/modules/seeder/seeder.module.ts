import { SeederController } from './seeder.controller';
import { SeederService } from './seeder.service';
import { FootBallMatch } from './../../entities/foot-ball-match.entity';
import { FootBallTeam } from './../../entities/foot-ball-team.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FootBallTeam,
      FootBallMatch,
    ]),
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}