/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit?: number = 12;

  // cursor = id del último producto recibido (para paginación cursor-based)
  @IsOptional()
  @IsUUID()
  cursor?: string;
}
