import { IsArray, IsNotEmpty, IsString } from "class-validator"

export class idsDTO {
  @IsArray()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  ids!: string[]
}
