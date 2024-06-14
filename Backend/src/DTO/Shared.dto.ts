import { IsArray, IsMongoId, IsNotEmpty, IsString } from "class-validator"

export class idsDTO {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  @IsMongoId({ each: true })
  ids!: string[]
}

export class idDTO {
  @IsString()
  @IsMongoId()
  id!: string
}
