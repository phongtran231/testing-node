import { ClientService } from './client.service';
import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { DateValidate } from '../../custom-validate/date-validate.validate';

@Controller('matches')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get('/')
  async getFullMatches(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
  ) {
    return this.clientService.getAllMatch({ page, limit });
  }

  @Get('/:date')
  async getMatchOnDate(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Param(
      new ValidationPipe({
        transform: true,
      }),
    )
    param: DateValidate,
  ) {
    return this.clientService.getMatchesOnDate({ page, limit }, param.date);
  }
}
