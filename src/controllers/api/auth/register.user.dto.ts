import { IsEmail, IsOptional, IsString } from "class-validator";

class RegisterUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsOptional()
    @IsString()
    public name: string;

    @IsString()
    public password: string;
}

export default RegisterUserDto;
