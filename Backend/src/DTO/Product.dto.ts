import {
  IsArray,
  IsBase64,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator"
import { idDTO } from "./Shared.dto"

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

  @IsBase64({}, { each: true })
  @IsOptional()
  imageUrls!: string[]

  @IsMongoId()
  @IsNotEmpty()
  category!: string
}

export class productUpdateDTO extends idDTO {
  @IsString()
  @IsOptional()
  title!: string

  @IsString()
  @IsOptional()
  description!: string

  @IsNumber()
  @Min(0)
  @IsOptional()
  price!: number

  @IsNumber()
  @Min(0)
  @IsOptional()
  salePrice!: number | null

  @IsNumber()
  @Min(0)
  @IsOptional()
  countInStock!: number

  @IsArray()
  @IsBase64({}, { each: true })
  @IsOptional()
  imageUrls!: string[]

  @IsMongoId()
  @IsOptional()
  category!: string
}

export class productParamsDTO {
  @IsOptional()
  @IsString()
  title!: string

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000)
  minPrice!: number

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000)
  maxPrice!: number

  @IsOptional()
  @IsBoolean()
  onlySales!: boolean

  @IsOptional()
  @IsString()
  category!: string

  @IsOptional()
  @IsBoolean()
  isArchived!: boolean
}
