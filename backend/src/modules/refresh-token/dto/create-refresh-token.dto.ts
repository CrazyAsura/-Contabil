import { Types } from "mongoose";

export class CreateRefreshTokenDto {
    token: string;
    userId: Types.ObjectId;
}
