import { IsNotEmpty, IsString } from "class-validator"

export class currentUserDTO {
  @IsNotEmpty()
  @IsString()
  username!: string
}
