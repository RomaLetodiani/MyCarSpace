import { IsJWT, IsNotEmpty, IsString, MinLength } from "class-validator"

export class loginUserDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  username!: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string
}

export class refreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  refreshToken!: string
}

// TODO: Add DTO for registerUser
