import { IsEmail, IsString } from "class-validator";

class RegisterUserDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    public name: string;

    @IsString()
    public password: string;
}

export default RegisterUserDto;
