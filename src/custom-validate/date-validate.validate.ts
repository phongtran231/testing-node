import { Type } from 'class-transformer';
import { IsDate } from 'class-validator';

export class DateValidate {
  @IsDate()
  @Type(() => Date)
  date: Date;
}
