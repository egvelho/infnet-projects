import { MinLength, MaxLength, Min } from "class-validator";

export class UpdateTrainerDto {
  @MinLength(2)
  @MaxLength(16)
  name: string;

  @MinLength(2)
  @MaxLength(24)
  surname: string;

  @MinLength(4)
  @MaxLength(48)
  password: string;

  @Min(0)
  credit: number;
}
