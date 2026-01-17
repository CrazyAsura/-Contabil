import { IsString } from "class-validator";

import { IsNotEmpty } from "class-validator";

export class CreatePhoneDto {
    @IsString()
    @IsNotEmpty()
    number: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    ddd: string;

    @IsString()
    @IsNotEmpty()
    ddi: string;
}
