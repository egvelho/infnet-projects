import {
  MinLength,
  MaxLength,
  Min,
  Max,
  Matches,
  Equals,
  IsInt,
} from "class-validator";

export class PokeStoreCreateDto {
  @MinLength(2)
  @MaxLength(16)
  name: string;

  @Matches(/^\/.*\.(png|jpe?g|gif)$/g)
  image: string;

  @Matches(/^(Planta|Fogo|Água)$/g)
  type: string;

  @IsInt()
  @Min(20)
  @Max(999)
  hp: number;

  @IsInt()
  @Min(1)
  @Max(9999)
  atk: number;

  @IsInt()
  @Min(1)
  @Max(9999)
  def: number;

  @IsInt()
  @Equals(1)
  level: number;

  @IsInt()
  @Equals(0)
  exp: number;

  @IsInt()
  @Min(1)
  price: number;
}
