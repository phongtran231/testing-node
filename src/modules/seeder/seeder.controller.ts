import { SeederService } from './seeder.service';
import { Controller, Get } from "@nestjs/common";

@Controller('seeder')
export class SeederController {
  constructor(
    private seederService: SeederService
  ) {}

  @Get('/run-seed')
  runSeeder() {
    return this.seederService.runSeed().then(() => 'ok').catch(() => 'something wrong, please try again');
  }

  @Get('/revert-seed')
  async revertSeeder() {
    return await this.seederService.rollbackSeed().then(() => 'ok').catch(() => 'something wrong, please try again');
  }
}