import { IsInt, Min, Max } from 'class-validator';

export class GradeDto {
  @IsInt()
  @Min(0)
  @Max(100)
  grade: number;
}
