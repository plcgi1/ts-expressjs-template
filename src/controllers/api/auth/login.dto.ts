import { IsEmail, IsString } from "class-validator";

class LoginDto {
    @IsString()
    @IsEmail()
    public email: string;

    @IsString()
    public password: string;
}

export default LoginDto;
