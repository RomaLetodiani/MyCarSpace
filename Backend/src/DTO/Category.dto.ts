import { IsNotEmpty, IsString } from "class-validator"

export class categoryCreateDTO {
  @IsString()
  @IsNotEmpty()
  name!: string
}

export class categoryUpdateDTO extends categoryCreateDTO {}
