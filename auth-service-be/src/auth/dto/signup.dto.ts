import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/, {
    message:
      "Password must contain at least 1 letter, 1 number, and 1 special character",
  })
  password: string;
}
