import { IsOptional, IsString } from "class-validator";

class CreatePostDto {
    @IsOptional()
    @IsString()
    public content: string;

    @IsString()
    public title: string;
}

export default CreatePostDto;
