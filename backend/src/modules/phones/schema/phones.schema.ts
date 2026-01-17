import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Phones {
    @Prop({ required: true })
    number: string;

    @Prop({ required: true })
    type: string;

    @Prop({required: true})
    ddd: string;

    @Prop({ required: true })
    ddi: string;

    
}
