import { Prop,Schema } from "@nestjs/mongoose/dist/decorators";
import { Types } from "mongoose";

@Schema()
export class RefreshTokenSchema {
  @Prop({required: true})
  token: string;

  @Prop({required: true})
  userId: Types.ObjectId;
}