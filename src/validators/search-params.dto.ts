import { IsEnum, IsNumber, IsOptional } from "class-validator";

class SearchParamsDto {
    @IsOptional()
    @IsNumber()
    @IsEnum([1, -1])
    public sorder: number;

    @IsOptional()
    @IsNumber()
    public limit: number;

    @IsOptional()
    @IsNumber()
    public skip: number;
}

export default SearchParamsDto;
