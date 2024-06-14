import {
  IsBase64,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator"

export class productCreateDTO {
  @IsString()
  @IsNotEmpty()
  title!: string

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsNumber()
  @Min(0)
  price!: number

  @IsNumber()
  @IsOptional()
  @Min(0)
  salePrice!: number | null

  @IsNumber()
  @Min(0)
  countInStock!: number

  @IsBase64()
  @IsNotEmpty()
  imageUrl!: string

  @IsMongoId()
  @IsNotEmpty()
  category!: string
}
