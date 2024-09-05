import {IsEmail, IsNotEmpty, IsString, Length, Matches} from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email?: string;

    @Length(6,20)
    @IsString()
    @Matches(/^[a-zA-Z0-9]+$/, { message: 'Password must contain only letters and numbers.' })
    @IsNotEmpty()
    password?: string
}